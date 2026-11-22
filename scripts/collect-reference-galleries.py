"""Collect reference gallery assets for the private assignment.
The per-profile JSON preserves display order and records download failures.
"""
import concurrent.futures, html, json, pathlib, re, time, urllib.parse, urllib.request
ROOT=pathlib.Path(__file__).resolve().parent.parent
BASE='https://puppy.instabizweb.com'
slugs=re.findall(r"'([a-z0-9]+(?:-[a-z0-9]+)+)'",(ROOT/'lib/pups.ts').read_text(encoding='utf-8'))
source=(ROOT/'lib/puppies.ts').read_text(encoding='utf-8')
slugs+=re.findall(r"\['[^']*','[^']*','[^']*','([^']+)',[01]\]",source)
slugs=list(dict.fromkeys(slugs))
output=ROOT/'public/media/galleries';output.mkdir(parents=True,exist_ok=True)
headers={'User-Agent':'Mozilla/5.0'}
def fetch(url):
 for attempt in range(3):
  try:
   with urllib.request.urlopen(urllib.request.Request(url,headers=headers),timeout=45) as r:return r.read()
  except Exception:
   if attempt==2:raise
   time.sleep(1+attempt)
def profile(slug):
 try:
  page=fetch(BASE+'/puppies/'+slug).decode('utf-8')
  match=re.search(r'<ul[^>]*aria-label="All photos of [^"]+".*?</ul>',page,re.S)
  if not match:
   entries=re.findall(r'\\"url\\":\\"(/media/[^\\]+)\\",\\"kind\\":\\"(image|video)\\"',page)
   if len(entries)==1 and entries[0][1]=='image':return {'slug':slug,'items':[{'kind':'image','source':entries[0][0],'posterSource':None,'label':'Photo 1 of 1'}]}
   return {'slug':slug,'error':'Gallery list not found; media entries: '+str(len(entries))}
  buttons=re.findall(r'<button\b.*?</button>',match.group(),re.S)
  videos=list(dict.fromkeys(re.findall(r'\\"url\\":\\"(/media/[^\\]+)\\",\\"kind\\":\\"video\\"',page)))
  items=[];vi=0
  for button in buttons:
   label=html.unescape(re.search(r'aria-label="([^"]+)',button).group(1))
   image=re.search(r'<img\b[^>]*\bsrc="([^"]+)',button)
   poster=None
   if image:
    url=html.unescape(image.group(1));poster=urllib.parse.parse_qs(urllib.parse.urlparse(url).query).get('url',[url])[0]
   video=' video ' in label.lower()
   media=videos[vi] if video and vi<len(videos) else poster
   if video:vi+=1
   if not media:raise ValueError('Missing media: '+label)
   items.append({'kind':'video' if video else 'image','source':media,'posterSource':poster if video else None,'label':label})
  return {'slug':slug,'items':items}
 except Exception as e:return {'slug':slug,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: profiles=list(pool.map(profile,slugs))
print('Profiles',len(profiles),'errors',[(p['slug'],p['error']) for p in profiles if 'error' in p],flush=True)
(ROOT/'scripts/reference-galleries.json').write_text(json.dumps(profiles,indent=2,ensure_ascii=False),encoding='utf-8')
urls=set()
for p in profiles:
 for item in p.get('items',[]):
  urls.add(item['source'])
  if item.get('posterSource'):urls.add(item['posterSource'])
def download(url):
 name=urllib.parse.urlparse(url).path.split('/')[-1]
 folder=urllib.parse.urlparse(url).path.split('/')[2]
 dest=output/f'{folder}-{name}'
 try:
  if not dest.exists():dest.write_bytes(fetch(BASE+url))
  return url,'/media/galleries/'+dest.name,None
 except Exception as e:return url,None,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: results=list(pool.map(download,sorted(urls)))
lookup={url:path for url,path,err in results if path}
errors=[{'url':url,'error':err} for url,path,err in results if err]
for p in profiles:
 for item in p.get('items',[]):
  item['path']=lookup.get(item['source']);item['poster']=lookup.get(item.get('posterSource'))
(ROOT/'lib/gallery-data.json').write_text(json.dumps(profiles,indent=2,ensure_ascii=False),encoding='utf-8')
print('Assets',len(urls),'downloaded',len(lookup),'errors',errors,flush=True)

import concurrent.futures,html,json,pathlib,re,time,urllib.parse,urllib.request
root=pathlib.Path(__file__).resolve().parent.parent
with urllib.request.urlopen(urllib.request.Request('https://puppy.instabizweb.com/happy-families',headers={'User-Agent':'Mozilla/5.0'}),timeout=45) as response:s=response.read().decode('utf-8')
buttons=re.findall(r'<button\b[^>]*aria-label="Open photo \d+ of 64[^"]*".*?</button>',s,re.S)
print('Found',len(buttons),'family photos',flush=True)
assert len(buttons)==64
out=root/'public/media/families';out.mkdir(exist_ok=True)
def work(pair):
 n,b=pair;label=html.unescape(re.search(r'aria-label="([^"]+)',b).group(1));src=html.unescape(re.search(r'<img\b[^>]*\bsrc="([^"]+)',b).group(1));url=urllib.parse.parse_qs(urllib.parse.urlparse(src).query)['url'][0];path=out/(str(n)+pathlib.Path(urllib.parse.urlparse(url).path).suffix)
 for attempt in range(3):
  try:
   if not path.exists():
    with urllib.request.urlopen(urllib.request.Request('https://puppy.instabizweb.com'+url,headers={'User-Agent':'Mozilla/5.0'}),timeout=40) as r:path.write_bytes(r.read())
   return {'src':'/media/families/'+path.name,'caption':label.split(': ',1)[1] if ': ' in label else '', 'source':url}
  except Exception:
   if attempt==2:raise
   time.sleep(attempt+1)
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:items=list(pool.map(work,enumerate(buttons,1)))
(root/'lib/families.json').write_text(json.dumps(items,indent=2,ensure_ascii=False),encoding='utf-8')
print('Downloaded',len(items),'photos',flush=True)

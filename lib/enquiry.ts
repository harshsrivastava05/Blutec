export type Enquiry={name:string;phone:string;email:string;area:string;message:string;puppyId:string;website:string};
type Result={ok:true;data:Enquiry}|{ok:false;error:string};
export function validateEnquiry(value:unknown):Result{
 if(!value||typeof value!=='object'||Array.isArray(value))return {ok:false,error:'Please check your details and try again.'};
 const obj=value as Record<string,unknown>;const fields=['name','phone','email','area','message','puppyId','website'] as const;
 if(fields.some(k=>obj[k]!==undefined&&typeof obj[k]!=='string'))return {ok:false,error:'Please check your details and try again.'};
 const data=Object.fromEntries(fields.map(k=>[k,((obj[k] as string|undefined)||'').trim()])) as Enquiry;
 if(data.website)return {ok:true,data};
 if(data.name.length<2||data.name.length>100)return {ok:false,error:'Please enter your name (2–100 characters).'};
 if(data.phone.length>30||!/^[+\d\s().-]+$/.test(data.phone)||data.phone.replace(/\D/g,'').length<7)return {ok:false,error:'Please enter a valid phone or WhatsApp number.'};
 if(data.email&&(data.email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)))return {ok:false,error:'Please enter a valid email address.'};
 if(data.area.length>150||data.message.length>2000||data.puppyId.length>100)return {ok:false,error:'One of your answers is too long.'};
 return {ok:true,data};
}
export async function sendEnquiry(data:Enquiry,config:{apiKey:string;from:string;to:string},send:typeof fetch=fetch){
 const text=[`Name: ${data.name}`,`Phone: ${data.phone}`,`Email: ${data.email||'Not provided'}`,`Area: ${data.area||'Not provided'}`,`Puppy: ${data.puppyId||'Any puppy'}`,'',data.message||'(No message)'].join('\n');
 const response=await send('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${config.apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from:config.from,to:[config.to],subject:'New TeddyPups enquiry',text,...(data.email?{reply_to:data.email}:{})}),signal:AbortSignal.timeout(10000)});
 return response.ok;
}

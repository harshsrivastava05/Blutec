import {validateEnquiry,sendEnquiry} from '@/lib/enquiry';
import {available} from '@/lib/puppies';
export async function POST(request:Request){
 if(Number(request.headers.get('content-length')||0)>10000)return Response.json({error:'Your message is too long.'},{status:413});
 let text='';try{const reader=request.body?.getReader();if(!reader)throw new Error('Empty');let size=0;const decoder=new TextDecoder();while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>10000){await reader.cancel();return Response.json({error:'Your message is too long.'},{status:413})}text+=decoder.decode(value,{stream:true})}text+=decoder.decode()}catch{return Response.json({error:'Please check your details and try again.'},{status:400})}
 let body:unknown;try{body=JSON.parse(text)}catch{return Response.json({error:'Please check your details and try again.'},{status:400})}
 const result=validateEnquiry(body);if(!result.ok)return Response.json({error:result.error},{status:400});
 if(result.data.website)return Response.json({ok:true});
 if(result.data.puppyId&&!available.some(p=>p.slug===result.data.puppyId))return Response.json({error:'Please choose an available puppy.'},{status:400});
 const {RESEND_API_KEY,ENQUIRY_FROM,ENQUIRY_TO}=process.env;
 if(!RESEND_API_KEY||!ENQUIRY_FROM||!ENQUIRY_TO)return Response.json({error:'Enquiries are not configured yet. Please try again later.'},{status:503});
 try{const ok=await sendEnquiry(result.data,{apiKey:RESEND_API_KEY,from:ENQUIRY_FROM,to:ENQUIRY_TO});if(!ok)return Response.json({error:'We could not send your enquiry. Please try again.'},{status:502});return Response.json({ok:true})}catch{return Response.json({error:'We could not send your enquiry. Please try again.'},{status:502})}
}

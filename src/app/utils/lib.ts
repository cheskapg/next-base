'use server';

import { redirect } from '@/node_modules/next/navigation';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { verifyUserSession } from '../actions/api';
import UserSession from '../interface/UserSession';

const secretKey = process.env.APP_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any, expirationTime: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime || '1 hour from now')
    .sign(key);
    
}

export async function decrypt(input: string): Promise<any> {
  try {
    
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
      
    });
    return payload;
  } catch (e) {
    console.log('decrypt error', e);
    return null;
  }
}

export async function logout(): Promise<any> {
  cookies().delete('session');
}

export async function validate(dob:string, patientId:number) {
    const session = await verifyUserSession(patientId,dob)

    if (session==undefined) 
    {
      return false;
    }
    else
    {
      const token = await decrypt(session);
      return await createSession( session);
     
      }   
  }

 export async function createSession(session:string) {
    const expires = (new Date(Date.now()+ (1 * 60 * 60 * 1000)));
    cookies().set("session",  session, {expires: expires });
    // console.log("Cookie "+cookies().get('session'));
    return true;
 } 

export async function getSession(regId:number) {
  const session = cookies().get('session')?.value;
  console.log("Cookie "+cookies().get('session'));
  if (session==undefined) 
  {
    console.log("sesstion "+session);
    redirect(`${regId}/validate`)
    
  }
  else
  {
     
     const user = (await decrypt(session)) as UserSession;
     if(user.id != regId)
     {
       
        redirect(`${regId}/validate`)
     }
    return user;
    }   
}


import { authOptions } from '@/app/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions } from 'next-auth'
// import { authOptions } from 'src/app/lib/auth';


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
 















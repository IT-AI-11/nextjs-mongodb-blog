



import { Webhook } from 'svix'
import { headers } from 'next/headers'
//import { WebhookEvent } from '@clerk/nextjs/server'
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user'

export async function POST(req) {

  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  // const { id } = evt.data    original
  //const eventType = evt.type    original
    const { id } = evt?.data   
    const eventType = evt?.type    
    console.log(`777Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('777Webhook payload:', body)


  // используем эти две функции чтобы отправить данные пользователя/user c Clerk в MongoDB Atlas
  // см. lib/actions/user.js там эти две функции  createOrUpdateUser() и deleteUser()
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses, username } =
      evt?.data;
    try {
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        email_addresses,
        username
      );
      if (user && eventType === 'user.created') {
        try {

          // эти Metadata данные приходят уже из MongoDB Atlas в Clerk 
          // Clerk > Users > Metadata > public ( в нем данные пользователя/user из MongoDB Atlas ) 
          // те добавляем id user/пользователя из MongoDB в Clerk чтобы каждый раз не запрашивать информацию пользователя/user из MongoDB 
          // через metadata 
          // 1:48:00 min обьяснил он
          await clerkClient.users.updateUserMetadata(id, {
            // см. в Clerk > Users > Metadata > public ( в нем данные пользователя/user из MongoDB Atlas ) 
            publicMetadata: {
              userMongoId: user._id,
              isAdmin: user.isAdmin,
            },
          });
        } catch (error) {
          console.log('Error updating user metadata:', error);
        }
      }
    } catch (error) {
      console.log('Error creating or updating user:', error);
      return new Response('Error occured', {
        status: 400,
      });
    }
  }



  if (eventType === 'user.deleted') {
    const { id } = evt?.data;
    try {
      await deleteUser(id);
    } catch (error) {
      console.log('Error deleting user:', error);
      return new Response('Error occured', {
        status: 400,
      });
    }
  }


// just for testing
//   if (evt.type === 'user.created') {
//     console.log('222userId:', evt.data.id)
//     console.log(`222Received webhook with ID ${id} and event type of ${eventType}`)
//     console.log('222Webhook payload:', body)
//   }
//   if (evt.type === 'user.updated') {
//     console.log('user updated444', evt.data.id)
//   }


  //return new Response('Webhook received', { status: 200 })   original
  return new Response('', { status: 200 })
}
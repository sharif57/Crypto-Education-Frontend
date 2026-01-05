// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';
// import { Button } from '@/components/ui/button'
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from '@/components/ui/card'
// import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { useUserSendMessageMutation } from '@/Redux/feature/userSlice'
// import React from 'react'
// import { toast } from 'sonner';

// export default function Contact() {
//     const [message, setMessage] = React.useState('');
//     const [name, setName] = React.useState('');
//     const [email, setEmail] = React.useState('');
//     const [phone, setPhone] = React.useState('');
//     const [first, setFirst] = React.useState(true);
//     const [second, setSecond] = React.useState(false);

//     const [userSendMessage] = useUserSendMessageMutation();


//     //     {
//     //     "first_name": "John",
//     //     "last_name": "Doe",
//     //     "email": "john@example.com",
//     //     "phone_number": "+8801XXXXXXXX",
//     //     "message": "I would like to know more about your service."
//     // }

//     const handleSendMessage = async (data) => {

//         try {
//             const data = {
//                 "first_name": name,
//                 "last_name": second,
//                 "email": email,
//                 "phone_number": phone,
//                 "message": message
//             }
//             const res = await userSendMessage(data).unwrap();
//             toast.success(res.message || "Message sent successfully!");
//             console.log(res);
//         } catch (error: any) {
//             toast.error(error?.data?.message || "Failed to send message. Please try again.");
//             console.error(error);
//         }
//     }

//     return (
//         <div className="w-full min-h-screen bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
//             <main className="relative z-10 pt-[80px] pb-14">
//                 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">

//                     {/* HERO */}
//                     <div className="text-center mb-14">
//                         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6">
//                             Let us know if we can help you
//                         </h1>

//                         <p className="text-base sm:text-lg text-[#B4B4B4] max-w-3xl mx-auto">
//                             Have questions or need support?
//                             We’re just a message away and always happy to help you move forward.
//                         </p>
//                     </div>

//                     {/* GLASS CARD */}
//                     <Card
//                         className="
//               mx-auto w-full max-w-xl
//               bg-white/10 backdrop-blur-xl
//               border border-white/20
//               rounded-2xl shadow-2xl 
//             "
//                     >
//                         <CardHeader className="text-center">
//                             <CardTitle className="text-white text-2xl">
//                                 User Information
//                             </CardTitle>
//                             <CardDescription className="text-[#B4B4B4]">
//                                 Please fill in your details below
//                             </CardDescription>
//                         </CardHeader>

//                         <CardContent>
//                             <form className="space-y-6">
//                                 <FieldGroup>

//                                     {/* NAME */}
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         <Field>
//                                             <FieldLabel htmlFor="firstName" className='text-[#B8B8B8]'>First Name</FieldLabel>
//                                             <Input
//                                                 id="firstName"
//                                                 placeholder="John"
//                                                 className=' placeholder:text-gray-400'
//                                                 required
//                                             />
//                                         </Field>

//                                         <Field>
//                                             <FieldLabel htmlFor="lastName" className='text-[#B8B8B8]'>Last Name</FieldLabel>
//                                             <Input
//                                                 id="lastName"
//                                                 placeholder="Doe"
//                                                 className=' placeholder:text-gray-400'
//                                                 required
//                                             />
//                                         </Field>
//                                     </div>

//                                     {/* CONTACT */}
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         <Field>
//                                             <FieldLabel htmlFor="email" className='text-[#B8B8B8]'>Email</FieldLabel>
//                                             <Input
//                                                 id="email"
//                                                 type="email"
//                                                 placeholder="john@example.com"
//                                                 className=' placeholder:text-gray-400'
//                                                 required
//                                             />
//                                         </Field>

//                                         <Field>
//                                             <FieldLabel htmlFor="phone" className='text-[#B8B8B8]'>Phone Number</FieldLabel>
//                                             <Input
//                                                 id="phone"
//                                                 type="tel"
//                                                 placeholder="+880 1XXXXXXXXX"
//                                                 className=' placeholder:text-gray-400'
//                                                 required
//                                             />
//                                         </Field>
//                                     </div>

//                                     {/* MESSAGE */}
//                                     <Field>
//                                         <FieldLabel htmlFor="message" className='text-[#B8B8B8]'>Message</FieldLabel>
//                                         <Textarea
//                                             id="message"
//                                             placeholder="Write your message here..."
//                                             className="min-h-[120px] "
//                                         />
//                                     </Field>

//                                     {/* SUBMIT */}
//                                     <Button
//                                         type="submit"
//                                         size="lg"
//                                         className="
//                       w-full bg-[#62C1BF]
//                       hover:bg-[#52a9a7]
//                       text-[#224443]
//                       font-medium
//                       px-8 py-6
//                       rounded-xl
//                       text-lg
//                       transition-all duration-300
//                       shadow-lg shadow-cyan-400/25
//                       hover:shadow-cyan-400/40
//                     "
//                                     >
//                                         Submit Message
//                                     </Button>

//                                 </FieldGroup>
//                             </form>
//                         </CardContent>
//                     </Card>

//                 </div>
//             </main>
//         </div>
//     )
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUserSendMessageMutation } from '@/Redux/feature/userSlice';
import { toast } from 'sonner';

export default function Contact() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');

  const [userSendMessage, { isLoading }] = useUserSendMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phone,
        message,
      };

      const res = await userSendMessage(payload).unwrap();
      toast.success(res?.message || 'Message sent successfully!');

      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send message');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
      <main className="pt-[80px] pb-14 px-4">
        <div className="max-w-6xl mx-auto pt-16 pb-24">

          {/* HERO */}
          <div className="text-center mb-14">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white mb-6">
              Let us know if we can help you
            </h1>
            <p className="text-sm sm:text-lg text-[#B4B4B4] max-w-3xl mx-auto">
              Have questions or need support?  
              We’re just a message away and always happy to help.
            </p>
          </div>

          {/* FORM CARD */}
          <Card className="mx-auto max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">
                User Information
              </CardTitle>
              <CardDescription className="text-[#B4B4B4]">
                Please fill in your details below
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FieldGroup>

                  {/* NAME */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel className="text-[#B8B8B8]">First Name</FieldLabel>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        className='text-white'
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel className="text-[#B8B8B8]">Last Name</FieldLabel>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className='text-white'
                        required
                      />
                    </Field>
                  </div>

                  {/* CONTACT */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel className="text-[#B8B8B8]">Email</FieldLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className='text-white'
                        required
                      />
                    </Field>

                    <Field>
                      <FieldLabel className="text-[#B8B8B8]">Phone</FieldLabel>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 1XXXXXXXXX"
                        className='text-white'
                        required
                      />
                    </Field>
                  </div>

                  {/* MESSAGE */}
                  <Field>
                    <FieldLabel className="text-[#B8B8B8]">Message</FieldLabel>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="min-h-[120px] text-white"
                      required
                    />
                  </Field>

                  {/* SUBMIT */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-[#62C1BF] hover:bg-[#52a9a7] text-[#224443] font-medium py-6 rounded-xl text-lg transition-all shadow-lg shadow-cyan-400/25"
                  >
                    {isLoading ? 'Sending...' : 'Submit Message'}
                  </Button>

                </FieldGroup>
              </form>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}

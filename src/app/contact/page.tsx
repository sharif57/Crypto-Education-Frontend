
// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import React from 'react';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { useUserSendMessageMutation } from '@/Redux/feature/userSlice';
// import { toast } from 'sonner';

// export default function Contact() {
//   const [firstName, setFirstName] = React.useState('');
//   const [lastName, setLastName] = React.useState('');
//   const [email, setEmail] = React.useState('');
//   const [phone, setPhone] = React.useState('');
//   const [message, setMessage] = React.useState('');

//   const [userSendMessage, { isLoading }] = useUserSendMessageMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!firstName || !lastName || !email || !phone || !message) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     try {
//       const payload = {
//         first_name: firstName,
//         last_name: lastName,
//         email,
//         phone_number: phone,
//         message,
//       };

//       const res = await userSendMessage(payload).unwrap();
//       toast.success(res?.message || 'Message sent successfully!');

//       // Reset form
//       setFirstName('');
//       setLastName('');
//       setEmail('');
//       setPhone('');
//       setMessage('');
//     } catch (error: any) {
//       toast.error(error?.data?.message || 'Failed to send message');
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
//       <main className="pt-[80px] pb-14 px-4">
//         <div className="max-w-6xl mx-auto pt-16 pb-24">

//           {/* HERO */}
//           <div className="text-center mb-14">
//             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-white mb-6">
//               Let us know if we can help you
//             </h1>
//             <p className="text-sm sm:text-lg text-[#B4B4B4] max-w-3xl mx-auto">
//               Have questions or need support?  
//               We’re just a message away and always happy to help.
//             </p>
//           </div>

//           {/* FORM CARD */}
//           <Card className="mx-auto max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
//             <CardHeader className="text-center">
//               <CardTitle className="text-white text-2xl">
//                 User Information
//               </CardTitle>
//               <CardDescription className="text-[#B4B4B4]">
//                 Please fill in your details below
//               </CardDescription>
//             </CardHeader>

//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <FieldGroup>

//                   {/* NAME */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field>
//                       <FieldLabel className="text-[#B8B8B8]">First Name</FieldLabel>
//                       <Input
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         placeholder="John"
//                         className='text-white'
//                         required
//                       />
//                     </Field>

//                     <Field>
//                       <FieldLabel className="text-[#B8B8B8]">Last Name</FieldLabel>
//                       <Input
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         placeholder="Doe"
//                         className='text-white'
//                         required
//                       />
//                     </Field>
//                   </div>

//                   {/* CONTACT */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Field>
//                       <FieldLabel className="text-[#B8B8B8]">Email</FieldLabel>
//                       <Input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="john@example.com"
//                         className='text-white'
//                         required
//                       />
//                     </Field>

//                     <Field>
//                       <FieldLabel className="text-[#B8B8B8]">Phone</FieldLabel>
//                       <Input
//                         type="tel"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         placeholder="+880 1XXXXXXXXX"
//                         className='text-white'
//                         required
//                       />
//                     </Field>
//                   </div>

//                   {/* MESSAGE */}
//                   <Field>
//                     <FieldLabel className="text-[#B8B8B8]">Message</FieldLabel>
//                     <Textarea
//                       value={message}
//                       onChange={(e) => setMessage(e.target.value)}
//                       placeholder="Write your message here..."
//                       className="min-h-[120px] text-white"
//                       required
//                     />
//                   </Field>

//                   {/* SUBMIT */}
//                   <Button
//                     type="submit"
//                     size="lg"
//                     disabled={isLoading}
//                     className="w-full bg-[#62C1BF] hover:bg-[#52a9a7] text-[#224443] font-medium py-6 rounded-xl text-lg transition-all shadow-lg shadow-cyan-400/25"
//                   >
//                     {isLoading ? 'Sending...' : 'Submit Message'}
//                   </Button>

//                 </FieldGroup>
//               </form>
//             </CardContent>
//           </Card>

//         </div>
//       </main>
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
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
  const [recaptchaToken, setRecaptchaToken] = React.useState<string | null>(null);

  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const [userSendMessage, { isLoading }] = useUserSendMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!recaptchaToken) {
      toast.error('Please verify reCAPTCHA');
      return;
    }

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phone,
        message,
        recaptchaToken,
      };

      const res = await userSendMessage(payload).unwrap();
      toast.success(res?.message || 'Message sent successfully!');

      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send message');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
      <main className="pt-[80px] pb-14 px-4">
        <div className="max-w-6xl mx-auto pt-16 pb-24">

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel className="text-[#B8B8B8]">First Name</FieldLabel>
                      <Input value={firstName} placeholder='' onChange={(e) => setFirstName(e.target.value)} className="text-white" />
                    </Field>

                    <Field>
                      <FieldLabel className="text-[#B8B8B8]">Last Name</FieldLabel>
                      <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="text-white" />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel className="text-[#B8B8B8]">Email</FieldLabel>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-white" />
                    </Field>

                    <Field>
                      <FieldLabel className="text-[#B8B8B8]">Phone</FieldLabel>
                      <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="text-white" />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel className="text-[#B8B8B8]">Message</FieldLabel>
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[120px] text-white" />
                  </Field>

                  {/* ✅ reCAPTCHA */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onChange={(token) => setRecaptchaToken(token)}
                      theme="dark"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#62C1BF] hover:bg-[#52a9a7] text-[#224443] py-6 rounded-xl text-lg"
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

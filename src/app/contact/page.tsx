// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import React from 'react'

// export default function page() {
//     return (
//         <div className="w-full  bg-gradient-to-b max-h-[800px]  from-[#326866] to-[#1B1B1B]">
//             <main className="relative z-10 pt-[80px] pb-14">
//                 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">

//                     {/* Top Pill */}


//                     {/* Hero Content */}
//                     <div className="text-center">
//                         <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight lg:text-7xl font-normal tracking-tight text-white mb-6">
//                             Let us know if we can help you
//                         </h1>

//                         <p className="text-base sm:text-lg text-[#B4B4B4] max-w-3xl mx-auto mb-10">
//                             Have questions or need support?
//                             We’re just a message away and always happy to help you move forward.
//                         </p>

//                         <div className="flex justify-center">


//                         </div>
//                     </div>

//                     <Card className="w-full max-w-md">
//                         <CardHeader>
//                             <CardTitle>User Information</CardTitle>
//                             <CardDescription>Please fill in your details below</CardDescription>

//                         </CardHeader>
//                         <CardContent>
//                             <form>
//                                 <FieldGroup>
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <Field>
//                                             <FieldLabel htmlFor="small-form-name"> First Name</FieldLabel>
//                                             <Input
//                                                 id="small-form-name"
//                                                 placeholder="Enter your name"
//                                                 required
//                                             />
//                                         </Field>
//                                         <Field>
//                                             <FieldLabel htmlFor="small-form-name">Last Name</FieldLabel>
//                                             <Input
//                                                 id="small-form-name"
//                                                 placeholder="Enter your name"
//                                                 required
//                                             />
//                                         </Field>

//                                     </div>
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <Field>
//                                             <FieldLabel htmlFor="small-form-name">Email</FieldLabel>
//                                             <Input
//                                                 id="small-form-name"
//                                                 placeholder="Enter your name"
//                                                 required
//                                             />
//                                         </Field>
//                                         <Field>
//                                             <FieldLabel htmlFor="small-form-name">Phone Number</FieldLabel>
//                                             <Input
//                                                 id="small-form-name"
//                                                 placeholder="Enter your name"
//                                                 required
//                                             />
//                                         </Field>

//                                     </div>

//                                     <Field>
//                                         <FieldLabel htmlFor="small-form-comments">Message</FieldLabel>
//                                         <Textarea
//                                             id="small-form-comments"
//                                             placeholder="Add any additional comments"
//                                         />
//                                     </Field>
//                                     <Field orientation="horizontal">
//                                         <Button type="submit">Submit</Button>
//                                         <Button
//                                             type='submit'
//                                             size="lg"
//                                             className="bg-[#62C1BF] hover:bg-[#52a9a7] cursor-pointer text-[#224443] font-medium !px-8 py-6 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 group"
//                                         >
//                                             Submit
//                                         </Button>

//                                     </Field>
//                                 </FieldGroup>
//                             </form>
//                         </CardContent>
//                     </Card>

//                 </div>
//             </main>
//         </div>
//     )
// }
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function Page() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
            <main className="relative z-10 pt-[80px] pb-14">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">

                    {/* HERO */}
                    <div className="text-center mb-14">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6">
                            Let us know if we can help you
                        </h1>

                        <p className="text-base sm:text-lg text-[#B4B4B4] max-w-3xl mx-auto">
                            Have questions or need support?
                            We’re just a message away and always happy to help you move forward.
                        </p>
                    </div>

                    {/* GLASS CARD */}
                    <Card
                        className="
              mx-auto w-full max-w-xl
              bg-white/10 backdrop-blur-xl
              border border-white/20
              rounded-2xl shadow-2xl 
            "
                    >
                        <CardHeader className="text-center">
                            <CardTitle className="text-white text-2xl">
                                User Information
                            </CardTitle>
                            <CardDescription className="text-[#B4B4B4]">
                                Please fill in your details below
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-6">
                                <FieldGroup>

                                    {/* NAME */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Field>
                                            <FieldLabel htmlFor="firstName" className='text-[#B8B8B8]'>First Name</FieldLabel>
                                            <Input
                                                id="firstName"
                                                placeholder="John"
                                                className=' placeholder:text-gray-400'
                                                required
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="lastName" className='text-[#B8B8B8]'>Last Name</FieldLabel>
                                            <Input
                                                id="lastName"
                                                placeholder="Doe"
                                                className=' placeholder:text-gray-400'
                                                required
                                            />
                                        </Field>
                                    </div>

                                    {/* CONTACT */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Field>
                                            <FieldLabel htmlFor="email" className='text-[#B8B8B8]'>Email</FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className=' placeholder:text-gray-400'
                                                required
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="phone" className='text-[#B8B8B8]'>Phone Number</FieldLabel>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+880 1XXXXXXXXX"
                                                className=' placeholder:text-gray-400'
                                                required
                                            />
                                        </Field>
                                    </div>

                                    {/* MESSAGE */}
                                    <Field>
                                        <FieldLabel htmlFor="message" className='text-[#B8B8B8]'>Message</FieldLabel>
                                        <Textarea
                                            id="message"
                                            placeholder="Write your message here..."
                                            className="min-h-[120px] "
                                        />
                                    </Field>

                                    {/* SUBMIT */}
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="
                      w-full bg-[#62C1BF]
                      hover:bg-[#52a9a7]
                      text-[#224443]
                      font-medium
                      px-8 py-6
                      rounded-xl
                      text-lg
                      transition-all duration-300
                      shadow-lg shadow-cyan-400/25
                      hover:shadow-cyan-400/40
                    "
                                    >
                                        Submit Message
                                    </Button>

                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </main>
        </div>
    )
}

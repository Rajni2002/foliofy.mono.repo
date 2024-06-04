import { Alert, AlertDescription, AlertTitle } from "@foliofy/ui/alert";
import { Button } from "@foliofy/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@foliofy/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@foliofy/ui/form";
import { CheckCheck, CheckCircleIcon, Copy } from "@foliofy/ui/icons";
import { Input, Textarea } from "@foliofy/ui/input";
import { GradientText } from "@foliofy/ui/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LINK = "https://foliofy-mono-repo-docs.vercel.app/?join=superlist";

type JoinSuperListProps = {
    isOpen: boolean
    visiblityHandler: () => void
}

// form schema
const FormSchema = z.object({
    fullName: z.string().min(4, {
        message: "Field empty"
    }),
    email: z.string().email({ message: "Invalid mail" }),
    feedback: z.string()
})

const JoinSuperList = ({ isOpen, visiblityHandler }: JoinSuperListProps): JSX.Element => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: "",
            email: ""
        },
    })
    const [isSubmmitted, setIsSubmitted] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, 2000);

            // Cleanup the timer on component unmount or when `isCopied` changes
            return () => clearTimeout(timer);
        }
    }, [isCopied]);


    async function onSubmit(values: z.infer<typeof FormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            const newData = {
                "parent": { "type": "database_id", "database_id": "4bfba2968a1e437087e358bb6f28a2ac" },
                "properties": {
                    "Name": {
                        "type": "title",
                        "title": [{ "type": "text", "text": { "content": values.fullName } }]
                    },
                    "Email": {
                        "type": "email",
                        "email": values.email
                    },
                    "Date": {
                        "type": "date",
                        "date": { "start": new Date().toISOString() }
                    },
                    "Feedback": {
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": values.feedback
                                }
                            }
                        ]
                    }
                }
            }
            const res = await fetch("/api/join-superlist", {
                method: "POST",
                body: JSON.stringify(newData),
            });
            const resJSon = await res.json();
            if (resJSon.exist) {
                form.setError("email", {
                    type: "manual",
                    message: "Email already exist",
                })
            } else {
                setIsSubmitted(true);
            }
        } catch (error) {
            form.setError("feedback", {
                type: "manual",
                message: "Something went wrong!",
            })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => {
            if (form.formState.isSubmitting || form.formState.isLoading) return;
            visiblityHandler();
            if (isOpen) form.reset();
            setIsSubmitted(false);
        }}>
            <DialogContent className="md:h-fit bg-black border-gray-800 py-5"
            >
                <DialogHeader>
                    <p className='text-center w-full text-xl md:text-3xl'>
                        Join the
                    </p>
                    <p className='w-full text-5xl md:text-6xl text-center'>
                        <GradientText className='italic px-4 font-black'>
                            Superlist
                        </GradientText>
                    </p>
                </DialogHeader>

                {!isSubmmitted ?
                    <Form {...form}>
                        <form className="w-full space-y-2">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Full Name'
                                                className="bg-black border-gray-800"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Email'
                                                className="bg-black border-gray-800"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="feedback"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder='We love hear your feedback on our concept'
                                                className="bg-black border-gray-800 mt-4"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="mx-auto w-full"
                                type='button'
                                onClick={form.handleSubmit(onSubmit)}
                                loading={form.formState.isSubmitting || form.formState.isLoading}
                            >
                                <GradientText>
                                    Join super list
                                </GradientText>
                            </Button>

                        </form>
                    </Form>
                    :
                    <Alert className="bg-black text-white/80 border-gray-800">
                        <CheckCircleIcon className="h-4 w-4 stroke-green-500" />
                        <h1 className="text-sm font-semibold mb-1">Thanks for joining <span className="text-gray-300">{form.getValues().email} </span>
                            the superlist.
                        </h1>
                        <AlertDescription className="text-gray-400 text-xs">
                            Spread the word! Share this link with your developer friends and connections
                        </AlertDescription>
                        <div className="flex items-center gap-4 justify-center mt-3">
                            <Input disabled value={LINK}
                                className="bg-black border-gray-600 text-xs"
                            />
                            <div className="hover:brightness-150 border-gray-500 hover:cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(LINK).then(() => {
                                        // Optionally, alert the user that the link has been copied
                                        setIsCopied(true);
                                    }).catch(err => {
                                        // Handle any errors that occur during the copy operation
                                        form.setError("feedback", {
                                            type: "manual",
                                            message: "Failed to copy link",
                                        })
                                    });
                                }}>
                                {isCopied ? <CheckCheck className="h-4 w-4 text-gray-500" /> : <Copy className="h-4 w-4 text-gray-500" />}
                            </div>
                        </div>
                    </Alert>
                }
            </DialogContent>
        </Dialog >
    );
};

export default JoinSuperList;

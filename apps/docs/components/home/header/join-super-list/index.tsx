import { GradientText, Input, Dialog, DialogContent, DialogHeader, DialogFooter, Button } from "@foliofy/ui"
import { useForm } from '@foliofy/utils';
import { FormEvent } from "react";

type JoinSuperListProps = {
    isOpen: boolean
    visiblityHandler: () => void
}

type JoinListFormType = {
    firstName: string
    email: string
}

const JoinSuperList = ({ isOpen, visiblityHandler }: JoinSuperListProps): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<JoinListFormType>()

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit((data) => console.log(data))
    }

    // const handleSubmit = async () => {
    //     return;
    //     try {
    //         const newData = {
    //             "parent": { "type": "database_id", "database_id": "4bfba2968a1e437087e358bb6f28a2ac" },
    //             "properties": {
    //                 "Name": {
    //                     "type": "title",
    //                     "title": [{ "type": "text", "text": { "content": joinListFormData.fullName } }]
    //                 },
    //                 "Email": {
    //                     "type": "email",
    //                     "email": joinListFormData.email
    //                 },
    //                 "Date": {
    //                     "type": "date",
    //                     "date": { "start": new Date().toISOString() }
    //                 },
    //                 "Feedback": {
    //                     "type": "feedback",
    //                     "feedback": [{ "type": "text", "text": { "content": joinListFormData.feedback ?? "" } }]
    //                 }
    //             }
    //         }
    //         const res = await fetch("https://api.notion.com/v1/pages", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 // 'Authorization': `Bearer ${siteConfig.customFields.NOTION_DB_KEY}`,
    //                 "Notion-Version": "2022-06-28",
    //                 "Access-Control-Allow-Origin": "https://api.notion.com",
    //             },
    //             body: JSON.stringify(newData),
    //             mode: "cors"
    //         })
    //         alert("Done");
    //     } catch (error) {
    //         console.log(error);
    //         alert(error)
    //     }
    // }


    return (
        <Dialog open={isOpen} onOpenChange={visiblityHandler}>
            <DialogContent className="md:h-[50vh] bg-black border-gray-800 py-5"
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
                <form onSubmit={onSubmit} className="flex flex-col items-center gap-2 mt-6 w-full mx-auto">
                    <Input {...register("firstName", {
                        required: "Please Enter Your Email!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email!"
                        }
                    })} placeholder='Full Name' className="bg-black border-gray-800"
                        aria-invalid={errors.firstName ? "true" : "false"} />
                    <Input {...register("email", {
                        required: true
                    })} placeholder='Type your email' type='email' className="bg-black border-gray-800" required />
                    <Button className="mx-auto w-full" type='button' loading={isSubmitting}>
                        <GradientText>
                            Join super list
                        </GradientText>
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default JoinSuperList;

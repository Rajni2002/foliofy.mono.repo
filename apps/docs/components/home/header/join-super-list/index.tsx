import React, { useState } from 'react';
import { GradientText, Input, Dialog, DialogContent, DialogHeader, DialogFooter, Button } from "@foliofy/ui"

type JoinSuperListProps = {
    isOpen: boolean
    visiblityHandler: () => void
}

type JoinListFormType = {
    fullName: string
    email: string
    feedback?: string
}

const JoinSuperList = ({ isOpen, visiblityHandler }: JoinSuperListProps): JSX.Element => {
    // const { siteConfig } = useDocusaurusContext();

    const [joinListFormData, setJoinListFormData] = useState<JoinListFormType>({
        fullName: "",
        email: ""
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setJoinListFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validateForm = () => {
        if (!joinListFormData.email.length || !joinListFormData.fullName.length) {
            alert("Email and Full Name fileds are required");
            return;
        }
        const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
        const NAME_REGEX = /^[A-Za-z\s]+$/;
        if (!joinListFormData.fullName.match(NAME_REGEX)) {
            alert("Invalid Full Name");
            return;
        }
        if (!joinListFormData.email.match(EMAIL_REGEX)) {
            alert("Invalid email");
            return;
        }
        handleSubmit()
    }

    const handleSubmit = async () => {
        return;
        try {
            const newData = {
                "parent": { "type": "database_id", "database_id": "4bfba2968a1e437087e358bb6f28a2ac" },
                "properties": {
                    "Name": {
                        "type": "title",
                        "title": [{ "type": "text", "text": { "content": joinListFormData.fullName } }]
                    },
                    "Email": {
                        "type": "email",
                        "email": joinListFormData.email
                    },
                    "Date": {
                        "type": "date",
                        "date": { "start": new Date().toISOString() }
                    },
                    "Feedback": {
                        "type": "feedback",
                        "feedback": [{ "type": "text", "text": { "content": joinListFormData.feedback ?? "" } }]
                    }
                }
            }
            const res = await fetch("https://api.notion.com/v1/pages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Authorization': `Bearer ${siteConfig.customFields.NOTION_DB_KEY}`,
                    "Notion-Version": "2022-06-28",
                    "Access-Control-Allow-Origin": "https://api.notion.com",
                },
                body: JSON.stringify(newData),
                mode: "cors"
            })
            alert("Done");
        } catch (error) {
            console.log(error);
            alert(error)
        }
    }


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
                <div className="flex flex-col items-center gap-2 mt-6 w-10/12 mx-auto">
                    <Input placeholder='Full Name' className="bg-black border-gray-800" value={joinListFormData.fullName} required name='fullName' onChange={handleChange} />
                    <Input placeholder='Type your email' className="bg-black border-gray-800" required name='email' value={joinListFormData.email} onChange={handleChange} />
                </div>
                <DialogFooter>
                    <Button className="w-10/12 mx-auto">
                        <GradientText>
                            Join super list
                        </GradientText>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default JoinSuperList;

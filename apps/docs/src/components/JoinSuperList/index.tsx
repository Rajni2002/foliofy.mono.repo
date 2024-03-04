import React, { useState } from 'react';
import CancelIcon from "@site/static/icons/cancel.svg"
import { GradientHeading, HeadingSecondary, Input, Textarea, JoinButton } from '@foliofy/ui';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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
    const { siteConfig } = useDocusaurusContext();

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
                    'Authorization': `Bearer ${siteConfig.customFields.NOTION_DB_KEY}`,
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
        isOpen && <div className="h-screen backdrop-blur-lg absolute left-0 right-0 w-100 top-0 md:py-2">
            <div className='relative w-full md:w-4/12 h-screen md:h-[95vh] md:border-[.1px] md:border-gray-400 md:rounded-2xl mx-auto px-4 py-2 bg-black' style={{
                background: "url(/background/carvan.png) left bottom no-repeat, url(/background/stars.png) right bottom no-repeat",
                backgroundSize: "contain, cover"
            }} >
                <CancelIcon className='absolute top-2 right-2 cursor-pointer w-4 h-4 md:w-5 md:h-5' onClick={visiblityHandler} />
                <HeadingSecondary>
                    You are
                </HeadingSecondary>
                <GradientHeading className='font-semibold'>
                    Super
                </GradientHeading>
                <p className='text-gray-400 mt-5 mx-4 text-xs md:text-lg'>
                    We are about to release the stable version of the foliofy.
                    Be the first one to use it
                </p>
                <Input placeholder='Full Name' value={joinListFormData.fullName} required name='fullName' onChange={handleChange} />
                <Input placeholder='Type your email' required name='email' value={joinListFormData.email} onChange={handleChange} />
                <Textarea placeholder='Any Feedbacks or reviews are appreciated' value={joinListFormData.feedback} name='feedback' rows={5} onChange={handleChange} />
                <JoinButton onClick={validateForm} />
            </div>
        </div>
    );
};

export default JoinSuperList;

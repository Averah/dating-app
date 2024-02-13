import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import cls from './MessageForm.module.scss'

interface MessageFormProps {
    sendMessage: (message:string) => void
}

type UserSubmitForm = {
    message: string
}

const MessageForm: React.FC<MessageFormProps> = ({sendMessage}) => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSubmitForm>({ mode: "onChange" });

    const onSubmit = (data: UserSubmitForm) => {
        console.log(data.message);
        sendMessage(data.message)
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.MessageForm}>
            <div>
                <textarea
                className={cls.textarea}
                    placeholder="Введите сообщение..."
                    {...register("message", {
                        required: "You cannot send an empty message",
                    })}
                />
            </div>
            <div>
                <Button className={cls.messageBtn} type='submit'>Отправить</Button>
            </div>
        </form>
    );
};

export default MessageForm;
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import cls from './MessageForm.module.scss'

interface MessageFormProps {
    sendMessage: (message:string) => void
    isMessageSent: boolean
}

type UserSubmitForm = {
    message: string
}

const MessageForm: React.FC<MessageFormProps> = ({ sendMessage, isMessageSent }) => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSubmitForm>({ mode: "onChange" });

    const onSubmit = (data: UserSubmitForm) => {
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
            {isMessageSent && <div className={cls.messageStatus}>Сообщение отправлено</div>}
            <div>
                <Button className={cls.messageBtn} type='submit'>Отправить</Button>
            </div>
        </form>
    );
};

export default MessageForm;
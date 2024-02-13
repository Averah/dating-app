import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import cls from './MessageForm.module.scss'

type UserSubmitForm = {
    dialogsMessage: string
}

const MessageForm: React.FC = () => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSubmitForm>({ mode: "onChange" });

    const onSubmit = (data: UserSubmitForm) => {
        console.log(data);

        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.MessageForm}>
            <div>
                <textarea
                className={cls.textarea}
                    placeholder="Введите сообщение..."
                    {...register("dialogsMessage", {
                        required: "You cannot send an empty message",
                    })}
                />
            </div>
            <div>
                <Button className={cls.messageBtn}>Отправить</Button>
            </div>
        </form>
    );
};

export default MessageForm;
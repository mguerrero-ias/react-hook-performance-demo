/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

const Section = ({ children, name }) => {
    return <section key={`${name}-section`}>
        <h2>{name}</h2>
        {children}
    </section>
};

const Form = () => {
    const { register, handleSubmit, watch } = useForm();
    const onSubmitHandler = (value) => console.log(value);

    const { name, role, friends } = watch();

    return <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Section name='Data'>
            <input defaultValue='Miguel' {...register('name')} />
        </Section>
        <Section name='Settings'>
            <input defaultValue='Admin of everything' {...register('role')} />
        </Section>
        <Section name='Friends'>
            <input defaultValue='Eira (Amazon), Vishal Atmakuri (Big Strength), Gil (Gil), Nacho (Cheese), Other Nacho, Weso' {...register('friends')} />
        </Section>
        <pre name='Resume'>
            {name}
            <br />
            {role}
            <br />
            {friends}
            <br />
        </pre>
    </form>
}

export default Form;
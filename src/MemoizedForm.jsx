/* eslint-disable react/prop-types */
import { memo } from 'react';
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";

const Section = function Section({ children, name }) {
    return <section key={`${name}-section`}>
        <h2>{name}</h2>
        {children}
    </section>
};

const DataWrapper = () => {
    const name = useWatch({ name: 'name' });
    const { register } = useFormContext();

    return <DataSection name={name} register={register} />
};

const Display = ({ text }) => {
    return <p>{text}</p>
};

const DataSection = memo(function DataSectionMemo({ name, register }) {
    return <Section name='Data'>
        <Display text={`Display name: ${name}`} />
        <input {...register('name')} />
    </Section>;
});

const NameAndSettingsWrapper = () => {
    const [name, role] = useWatch({ name: ['name', 'role'] })

    return <NameAndSettings name={name} role={role} />
};

const NameAndSettings = memo(function SettingsAndFriends({ name, role }) {
    return <Section name='Name and settings'>
        <pre>
            <Display text={name} />
            <Display text={role} />
        </pre>
    </Section>
})

const SettingsAndFriendsWrapper = () => {
    const [role, friends] = useWatch({ name: ['role', 'friends'] })

    return <SettingsAndFriends role={role} friends={friends} />
};

const SettingsAndFriends = memo(function SettingsAndFriends({ role, friends }) {
    return <Section name='Settings and friends'>
        <pre>
            <Display text={role} />
            <Display text={friends} />
        </pre>
    </Section>
})

const MemoizedForm = () => {
    const methods = useForm({
        defaultValues: {
            role: 'Admin of everything',
            friends: 'Eira (Amazon), Vishal Atmakuri (Big Strength), Gil (Gil), Nacho (Cheese), Other Nacho, Weso, German (Garmendia)',
            name: 'Miguel'
        }
    });
    const { register, handleSubmit } = methods;
    const onSubmitHandler = (value) => console.log(value);

    return <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormProvider {...methods}>
            <DataWrapper />
            <Section name='Settings'>
                <input {...register('role')} />
            </Section>
            <Section name='Friends'>
                <input {...register('friends')} />
            </Section>
            <SettingsAndFriendsWrapper />
            <NameAndSettingsWrapper />
        </FormProvider>
    </form>
}

export default MemoizedForm;
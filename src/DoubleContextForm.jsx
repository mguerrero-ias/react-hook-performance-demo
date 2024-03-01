/* eslint-disable react/prop-types */
import { memo, createContext, useState, useContext, useEffect } from 'react';
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";

const networkDataContext = createContext({
    friends: [],
    setFriends: () => { },
    roles: [],
    setRoles: () => { },
    media: [],
    setMedia: () => { }
});

const { Provider } = networkDataContext;

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
const DataSubsection = () => {
    const [roles, setRoles] = useState([]);
    const { watch } = useFormContext();

    useEffect(() => {
        const subscription = watch((value) => {
            if (value.role) {
                setRoles(value.role);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    console.log('Data subseciton of a different kind');

    return <Section name='This is nested children'>
        <Display text={roles} />
    </Section>
};

const DataSection = memo(function DataSectionMemo({ name, register }) {
    return <Section name='Data'>
        <Display text={`Display name: ${name}`} />
        <DataSubsection />
        <input {...register('name')} />
    </Section>;
});


const NameAndSettingsWrapper = () => {
    // Only this 2.
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

// Wrapper has to watch the values, change the values, get the values, etc.
const SettingsAndFriendsWrapper = () => {
    const [role, friends] = useWatch({ name: ['role', 'friends'] })

    return <SettingsAndFriends role={role} friends={friends} />
};

// The children of it should be memorized.
const SettingsAndFriends = memo(function SettingsAndFriends({ role, friends }) {
    return <Section name='Settings and friends'>
        <pre>
            <Display text={role} />
            <Display text={friends} />
        </pre>
    </Section>
});

const RolesList = () => {
    const { roles } = useContext(networkDataContext);

    return <Section name='Roles List'>
        <ul>
            {roles.map((role, number) => <li key={number}>{role}</li>)}
        </ul>
    </Section>
};

const FriendsList = () => {
    const { friends } = useContext(networkDataContext);

    return <Section name='Friends List'>
        <ul>
            {friends.map((friend, number) => <li key={number}>{friend}</li>)}
        </ul>
    </Section>
};

const MediaList = () => {
    const { media } = useContext(networkDataContext);

    return <Section name='Media List'>
        <ul>
            {media.map((media, number) => <li key={number}>{media}</li>)}
        </ul>
    </Section>
};

const DoubleContextForm = () => {
    const [friends, setFriends] = useState([]);
    const [roles, setRoles] = useState([]);
    const [media, setMedia] = useState([]);

    const methods = useForm({
        defaultValues: {
            role: 'Admin of everything',
            friends: 'Eira (Amazon), Vishal Atmakuri (Big Strength), Gil (Gil), Nacho (Cheese), Other Nacho, Weso, German (Garmendia)',
            name: 'Miguel'
        }
    });
    const { register, handleSubmit, watch } = methods;
    const onSubmitHandler = (value) => console.log(value);

    useEffect(() => {
        const subscription = watch((value) => {
            // This will always cause a re-render.
            // setRoles(['Somewhere', 'Something', 'I know'])
            if (value.name !== '' && roles.length === 0) {
                setMedia(['Cartoon Network'])
            } else if (value.name === '' && roles.length !== 0) {
                setMedia([]);
            }

            // if (value.role !== '' && roles.length === 0) {
            //     setRoles(['Developer', 'Wizard', 'Bath Non Haver'])
            // } else if (value.role === '' && roles.length !== 0) {
            //     setRoles(['Bath Haver'])
            // }

            if (value.friends !== '' && friends.length === 0) {
                setFriends(['Eira', 'Erick', 'Gil', 'Vishal', 'Nacho', 'DanyBoy(Kun)'])
            } else if (value.friends === '' && friends.length !== 0) {
                setFriends([]);
            }
        })

        return () => subscription.unsubscribe();
    }, [friends.length, roles.length, watch]);

    return <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormProvider {...methods}>
            <Provider value={{ friends, media, roles, setFriends, setMedia, setRoles }}>
                <DataWrapper />
                <Section name='Settings'>
                    <input {...register('role')} />
                </Section>
                <Section name='Friends'>
                    <input {...register('friends')} />
                </Section>
                <SettingsAndFriendsWrapper />
                <NameAndSettingsWrapper />
                <RolesList />
                <FriendsList />
                <MediaList />
            </Provider>
        </FormProvider>
    </form>
}

export default DoubleContextForm;
import Image  from "next/image";

interface storeBadgeProps {
    type: 'google' | 'apple';
}

export function StoreBadge(props: storeBadgeProps) {
    const {type} = props;
    const src = type === 'google' ? '/icons/googlePlay.svg' : '/icons/appStore.svg';
    const href = type === 'google' ? 'https://play.google.com' : 'https://apps.apple.com/';
    return (
        <a href = {href} target = '_blank' rel='noopener noreferrer'>
            <Image src = {src} width ={150} height ={44} alt = {type} />
        </a>

    )
}
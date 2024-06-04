import { isDefined, isTruthyString } from "@togglecorp/fujs";
import { useEffect } from "react";

interface Props {
    className?: string;
    title: string;
    children: React.ReactNode;
}

function Page(props: Props) {
    const {
        title,
        className,
        children,
    } = props;

    useEffect(() => {
        if (isTruthyString(title)) {
            document.title = title;
        }
    }, [title]);

    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default Page;

import { useWindowHeight } from "@/shared/lib/hooks/useWindowHeight/useWindowHeight";


interface SafeAreaProps {
    children: React.ReactNode;
    className?: string;
}

export const SafeArea = ({ children, className }: SafeAreaProps) => {
    const windowHeight = useWindowHeight();

    return (
        <div 
            className={className}
            style={{ height: windowHeight, overflow: 'hidden' }}
        >
            {children}
        </div>
    );
};
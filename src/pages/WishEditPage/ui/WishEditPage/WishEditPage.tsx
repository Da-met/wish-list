import { memo } from "react";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";



interface WishEditPageProps {
    className?: string;
}

const WishEditPage = memo((props: WishEditPageProps) => {
    const {className} = props;
    const {id} = useParams<{id: string}>();
    const isEdit = Boolean(id)

    return (
        <Page>
            {isEdit ? 'РЕДАКТИРОВАНИЕ СТАТЬИ' : 'СОЗДАНИЕ СТАТЬИ'}
        </Page>
    )
})

export default WishEditPage
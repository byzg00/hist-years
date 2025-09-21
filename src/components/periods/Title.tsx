import { TitleLine, TitleText, TitleWrapper } from "./styled";

export const Title = (props: {
    title: string;
}) => {
    const { title } = props;

    return (
        <TitleWrapper>
            <TitleLine />
            <TitleText>{title}</TitleText>
        </TitleWrapper>
    );
};
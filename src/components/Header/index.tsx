import logoIcon from "../../assets/logo.svg";

import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModalOpen: () => void;
}

export function Header({ onOpenNewTransactionModalOpen }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoIcon} alt="dtmoney" />

        <button onClick={onOpenNewTransactionModalOpen}>Nova Transação</button>
      </Content>

    </Container>
  );
}
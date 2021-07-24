import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

import incomeIcon from "../../assets/income.svg";
import outcomeIcon from "../../assets/outcome.svg";
import totalIcon from "../../assets/total.svg";


export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraw += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraw: 0,
      total: 0,
    }
  );

  console.log(transactions)

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIcon} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeIcon} alt="Saídas" />
        </header>
        <strong>-
          {new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraw)}
        </strong>
      </div>

      <div className="hightlight-background">
        <header>
          <p>Total</p>
          <img src={totalIcon} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
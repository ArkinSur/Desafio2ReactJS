import React, { useState, useEffect } from 'react';
import moment from 'moment';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [transactionsX, setTransactions] = useState<Transaction[]>([]);
  const [balanceX, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');
      const { transactions, balance } = response.data;
      transactions.forEach((transaction: Transaction) => {
        transaction.formattedValue = formatValue(transaction.value);
      });
      setTransactions(transactions);
      setBalance(balance);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balanceX.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balanceX.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balanceX.total)}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            {transactionsX.map(item => {
              return (
                <tbody>
                  <tr>
                    <td className="title">{item.title}</td>
                    <td className={item.type}>
                      {item.type === 'outcome' && '- '}
                      {item.formattedValue}
                    </td>
                    <td>{item.category.title}</td>
                    <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;

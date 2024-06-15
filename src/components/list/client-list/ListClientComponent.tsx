import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useClientsList } from '@/functions/clients-list/ClientsList';
import { formatCPF, formatPhone } from '@/utils/form-utils';
import React from 'react';

const ListClientComponent: React.FC = () => {
  const { clients, error } = useClientsList();
  return (
    <div>
      <div className="title flex justify-between items-center text-light-textPrimary dark:text-dark-textPrimary">
        Lista de Clientes
      </div>
      {error && <p>{error}</p>}
      <Table className="mt-2 items-center">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]  text-light-textPrimary dark:text-dark-textPrimary">
              CPF
            </TableHead>
            <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
              Primeiro Nome
            </TableHead>
            <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
              Ultimo Nome
            </TableHead>
            <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
              Email
            </TableHead>
            <TableHead className="text-right text-light-textPrimary dark:text-dark-textPrimary">
              Telefone
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.cpf}>
              <TableCell className="font-medium text-left body text-light-textPrimary dark:text-dark-textPrimary">
                {formatCPF(client.cpf)}
              </TableCell>
              <TableCell className=" body text-center text-light-textPrimary dark:text-dark-textPrimary">
                {client.firstName}
              </TableCell>
              <TableCell className=" body text-center text-light-textPrimary dark:text-dark-textPrimary">
                {client.lastName}
              </TableCell>
              <TableCell className=" text-center body text-light-textPrimary dark:text-dark-textPrimary">
                {client.email}
              </TableCell>
              <TableCell className=" text-right body text-light-textPrimary dark:text-dark-textPrimary">
                {formatPhone(client.phone)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListClientComponent;

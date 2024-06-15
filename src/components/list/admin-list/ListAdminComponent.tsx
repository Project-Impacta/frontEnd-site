import { CreateAdminDialog } from '@/components/dialog/CreateAdminDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminsList } from '@/functions/admins/AdminsLits';
import { formatCPF } from '@/utils/form-utils';
import React from 'react';

const ListAdminComponent: React.FC = () => {
  const { admins, error } = useAdminsList();

  return (
    <div>
      <div className="title flex justify-between items-center text-light-textPrimary dark:text-dark-textPrimary">
        Lista de Administradores
        <CreateAdminDialog />
      </div>
      {error && <p>{error}</p>}
      <Table className="mt-2 items-center">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]    text-light-textPrimary dark:text-dark-textPrimary">
              CPF
            </TableHead>
            <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
              Primeiro Nome
            </TableHead>
            <TableHead className="text-center text-light-textPrimary dark:text-dark-textPrimary">
              Ultimo Nome
            </TableHead>
            <TableHead className="text-right text-light-textPrimary dark:text-dark-textPrimary">
              Email
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.cpf}>
              <TableCell className="font-medium text-left body text-light-textPrimary dark:text-dark-textPrimary">
                {formatCPF(admin.cpf)}
              </TableCell>
              <TableCell className=" body text-center text-light-textPrimary dark:text-dark-textPrimary">
                {admin.firstName}
              </TableCell>
              <TableCell className=" body text-center text-light-textPrimary dark:text-dark-textPrimary">
                {admin.lastName}
              </TableCell>
              <TableCell className=" text-right body text-light-textPrimary dark:text-dark-textPrimary">
                {admin.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListAdminComponent;

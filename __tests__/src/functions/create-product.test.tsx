import { CreateProductDialog } from '@/functions/create-product';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CreateProductDialog', () => {
  it('renders without crashing', () => {
    render(<CreateProductDialog />);
    // Verifica se o título está sendo exibido corretamente
    expect(screen.getByText('Cadastrar Novo Produto')).toBeInTheDocument();
  });

  it('allows user to fill out the form', async () => {
    render(<CreateProductDialog />);
    // Clica no botão "Cadastrar Novo Produto"
    fireEvent.click(screen.getByText('Cadastrar Novo Produto'));

    // Preenche os campos do formulário
    await userEvent.type(
      screen.getByLabelText('Nome do produto'),
      'Test Product',
    );
    await userEvent.type(
      screen.getByLabelText('Descrição do produto'),
      'This is a test description for the product.',
    );
    await userEvent.type(screen.getByLabelText('Preço do produto'), '100');

    // Seleciona a opção "Notebook" no componente de seleção
    const categorySelect = screen.getByLabelText('Categoria do produto');
    userEvent.selectOptions(categorySelect, 'Notebook');

    // Verifica se os campos foram preenchidos corretamente
    expect(screen.getByLabelText('Nome do produto')).toHaveValue(
      'Test Product',
    );
    expect(screen.getByLabelText('Descrição do produto')).toHaveValue(
      'This is a test description for the product.',
    );
    expect(screen.getByLabelText('Preço do produto')).toHaveValue('100');
    expect(screen.getByLabelText('Categoria do produto')).toHaveValue(
      'Notebook',
    );
  });
  it('submits the form when button is clicked', () => {
    render(<CreateProductDialog />);
    // Preenche o formulário
    userEvent.type(screen.getByLabelText('Nome do produto'), 'Test Product');
    userEvent.type(
      screen.getByLabelText('Descrição do produto'),
      'This is a test description for the product.',
    );
    userEvent.type(screen.getByLabelText('Preço do produto'), '100');
    fireEvent.change(screen.getByLabelText('Categoria do produto'), {
      target: { value: '1' },
    });
    // Simula o envio do formulário
    fireEvent.click(screen.getByText('Cadastrar'));
    // Verifica se a função de envio foi chamada
    // Você pode adicionar mais verificações conforme necessário, como verificar se uma mensagem de sucesso é exibida
  });

  // Adicionando log para verificar o conteúdo do DOM
  it('logs the content of the DOM', () => {
    render(<CreateProductDialog />);
    console.log(document.body.innerHTML);
  });
});

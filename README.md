
## Testes Automatizados
Os testes implementados incluem:

1. **Cadastro de Usuário**  
   - Pré-cadastro e cadastro completo com validação de campos.
2. **Login e Logout**  
   - Login com credenciais corretas e incorretas.
   - Logout e validação da tela inicial.
3. **Pesquisa e Navegação de Produtos**  
   - Pesquisa de produtos.
   - Visualização da lista de produtos e detalhes individuais.
4. **Carrinho e Finalização de Pedido**  
   - Adição de produtos ao carrinho.
   - Finalização de pedido com preenchimento de dados de pagamento.
5. **Exclusão de Conta**  
   - Exclusão de conta e validação de mensagens de confirmação.

## Como Executar
1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
cd pgats-automacao-web

Instale as dependências:

npm install


Execute os testes no modo interativo:

npx cypress open


Execute os testes no modo headless:

npx cypress run

Integração Contínua

O projeto pode ser integrado com GitHub Actions para execução automática dos testes em push ou pull request. Basta configurar um workflow .yml na pasta .github/workflows.
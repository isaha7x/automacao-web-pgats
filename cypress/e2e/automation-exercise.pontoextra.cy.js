describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com/')
        cy.get('a[href="/login"]').click()
    })

    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()
        const user = createRandomUser();

        cy.xpath('//input[@data-qa="signup-name"]').type(faker.internet.username());
        cy.xpath('//input[@data-qa="signup-email"]').type(faker.internet.email());
        cy.xpath('//button[contains(text(),"Signup")]').click();
        cy.xpath('//input[@type="radio" and @value="Mrs"]').check();
        cy.xpath('//input[@id="password"]').type('123456', { log: false });
        cy.xpath('//select[@data-qa="days"]').select('12');
        cy.xpath('//select[@data-qa="months"]').select('September');
        cy.xpath('//select[@data-qa="years"]').select('1988');
        cy.xpath('//input[@type="checkbox" and @id="newsletter"]').check();
        cy.xpath('//input[@type="checkbox" and @id="optin"]').check();
        cy.xpath('//input[@id="first_name"]').type('Bob');
        cy.xpath('//input[@id="last_name"]').type('Narciso Pipoca');
        cy.xpath('//input[@id="company"]').type('Pgats');
        cy.xpath('//input[@id="address1"]').type('Avenida Selenium, num 2004');
        cy.xpath('//select[@id="country"]').select('Canada');
        cy.xpath('//input[@id="state"]').type('California');
        cy.xpath('//input[@id="city"]').type('Los Angeles');
        cy.xpath('//input[@data-qa="zipcode"]').type('90001');
        cy.xpath('//input[@data-qa="mobile_number"]').type('111 222 333');
        cy.xpath('//button[@data-qa="create-account"]').click();
        
        cy.url().should('includes', 'account_created');
        cy.xpath('//b[contains(text(),"Account Created!")]').should('be.visible');
        cy.xpath('//h2[@data-qa="account-created"]').should('have.text', 'Account Created!');

        cy.xpath('//*[@data-qa="continue-button"]').should('be.visible').click();

        cy.contains('Logged in as');
    });

    it('Login de usuário com email e senha corretos', () => {
        cy.xpath('//input[@data-qa="login-email"]').type('usuario@qa.com');
        cy.xpath('//input[@data-qa="login-password"]').type('123456');
        cy.xpath('//button[contains(text(),"Login")]').click();
        cy.contains('Logged in as').should('be.visible');
        cy.xpath('//i[contains(@class,"fa-user")]').parent().should('contain','usuario QA');
    });

    it('Login de usuário com email e senha incorretos', () => {
        cy.xpath('//input[@data-qa="login-email"]').type('qa_errado@qa.com');
        cy.xpath('//input[@data-qa="login-password"]').type('123456');
        cy.xpath('//button[contains(text(),"Login")]').click();
        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Logout Usuário', () => {
        cy.xpath('//input[@data-qa="login-email"]').type('usuario@qa.com');
        cy.xpath('//input[@data-qa="login-password"]').type('123456');
        cy.xpath('//button[contains(text(),"Login")]').click();
        cy.contains('Logged in as').should('be.visible');
        cy.xpath('//a[@href="/logout"]').click();
        cy.contains('Signup / Login');
    });


    it('Cadastrar usuário com email existente no sistema', () => {
        cy.xpath('//input[@data-qa="signup-name"]').type('Tester QA');
        cy.xpath('//input[@data-qa="signup-email"]').type('usuario@qa.com');
        cy.xpath('//button[contains(text(),"Signup")]').click();
        cy.contains('Email Address already exist!').should('be.visible');
    });  
    
    it('Enviar um formulário de contato com upload de arquivo', () => {
        cy.visit('https://www.automationexercise.com/contact_us');
        cy.xpath('//input[@data-qa="name"]').type(userDataContact.name);
        cy.xpath('//input[@data-qa="email"]').type(userDataContact.email);
        cy.xpath('//input[@data-qa="subject"]').type(userDataContact.subject);
        cy.xpath('//textarea[@data-qa="message"]').type(userDataContact.yourmessage);

        cy.get('[name="upload_file"]').attachFile('contac_us_data.json');

        cy.xpath('//*[@data-qa="submit-button"]').should('be.visible').click();
        cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    });
    
});
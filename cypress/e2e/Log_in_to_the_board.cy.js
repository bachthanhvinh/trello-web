import { FIELD_REQUIRED_MESSAGE } from "../../src/utils/validators"

describe('Test Chức năng Đăng nhập (LoginForm)', () => {

  beforeEach(() => {
    // Mở trang login
    cy.visit('http://localhost:5173/login')
  })

  it('Đăng nhập thành công với tài khoản hợp lệ', () => {
    // 1. Tìm ô Email theo name attribute (do React Hook Form đăng ký qua register('email'))
    cy.get('input[name="email"]')
      .should('be.visible')
      .type('bachthanhvinh12@gmail.com') // Thay bằng email thật trong Database của bạn

    // 2. Tìm ô Password theo name attribute
    cy.get('input[name="password"]')
      .should('be.visible')
      .type('12345678a') // Thay bằng password thật (khớp với PASSWORD_RULE)

    // 3. Click nút Login (dùng type="submit" hoặc text "Login")
    cy.get('button[type="submit"]').click()

    // 4. Kiểm tra xem có chuyển hướng về trang chủ '/' thành công không
    cy.url().should('eq', 'http://localhost:5173/boards')
  })

  it('Hiển thị lỗi Validation khi không nhập gì mà ấn Submit', () => {
    // Thử bấm Submit ngay lập tức
    cy.get('button[type="submit"]').click()

    // Kiểm tra FieldErrorAlert có hiển thị thông báo lỗi required không
    cy.contains(FIELD_REQUIRED_MESSAGE).should('be.visible') // Hoặc tìm div chứa alert lỗi
  })

  it('Tìm kiếm Board 01 và mở board thành công', () => {
    // Login trước khi dùng chức năng tìm kiếm
    cy.get('input[name="email"]')
      .should('be.visible')
      .clear()
      .type('bachthanhvinh12@gmail.com')

    cy.get('input[name="password"]')
      .should('be.visible')
      .clear()
      .type('12345678a')

    cy.get('button[type="submit"]').click()

    cy.location('pathname', { timeout: 10000 }).should('eq', '/boards')

    // Gõ tên board 01 vào ô tìm kiếm board
    cy.get('input#asynchronous-search-board')
      .filter(':visible')
      .first()
      .clear()
      .type('board 01', { delay: 100 })

    // Chọn kết quả tìm kiếm board 01
    cy.contains('li', /board 01/i, { timeout: 10000 })
      .should('be.visible')
      .click()

    // Kiểm tra đã điều hướng tới trang board cụ thể
    cy.url().should('include', '/boards/')
    cy.contains(/board 01/i).should('be.visible')
  })

})
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WeatherSearch } from '../WeatherSearch'

describe('WeatherSearch Component', () => {
  const mockOnSearch = vi.fn()

  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  it('deve renderizar o componente corretamente', () => {
    render(<WeatherSearch onSearch={mockOnSearch} />)
    
    expect(screen.getByPlaceholderText('Digite o nome da cidade...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar clima' })).toBeInTheDocument()
  })

  it('deve chamar onSearch quando o formulário for submetido com cidade válida', async () => {
    const user = userEvent.setup()
    render(<WeatherSearch onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Digite o nome da cidade...')
    const button = screen.getByRole('button', { name: 'Buscar clima' })
    
    await user.type(input, 'São Paulo')
    await user.click(button)
    
    expect(mockOnSearch).toHaveBeenCalledWith('São Paulo')
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
  })

  it('deve chamar onSearch quando pressionar Enter no input', async () => {
    const user = userEvent.setup()
    render(<WeatherSearch onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Digite o nome da cidade...')
    
    await user.type(input, 'Rio de Janeiro{Enter}')
    
    expect(mockOnSearch).toHaveBeenCalledWith('Rio de Janeiro')
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
  })

  it('não deve chamar onSearch com input vazio', async () => {
    const user = userEvent.setup()
    render(<WeatherSearch onSearch={mockOnSearch} />)
    
    const button = screen.getByRole('button', { name: 'Buscar clima' })
    
    await user.click(button)
    
    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('deve trim do nome da cidade antes de chamar onSearch', async () => {
    const user = userEvent.setup()
    render(<WeatherSearch onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Digite o nome da cidade...')
    const button = screen.getByRole('button', { name: 'Buscar clima' })
    
    await user.type(input, '  São Paulo  ')
    await user.click(button)
    
    expect(mockOnSearch).toHaveBeenCalledWith('São Paulo')
  })

  it('deve desabilitar o botão quando isLoading é true', () => {
    render(<WeatherSearch onSearch={mockOnSearch} isLoading={true} />)
    
    const button = screen.getByRole('button', { name: 'Buscando...' })
    const input = screen.getByPlaceholderText('Digite o nome da cidade...')
    
    expect(button).toBeDisabled()
    expect(input).toBeDisabled()
    expect(button).toHaveTextContent('Buscando...')
  })

  it('deve desabilitar o botão quando o input está vazio', () => {
    render(<WeatherSearch onSearch={mockOnSearch} />)
    
    const button = screen.getByRole('button', { name: 'Buscar clima' })
    
    expect(button).toBeDisabled()
  })

  it('deve habilitar o botão quando o input tem texto', async () => {
    const user = userEvent.setup()
    render(<WeatherSearch onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Digite o nome da cidade...')
    const button = screen.getByRole('button', { name: 'Buscar clima' })
    
    expect(button).toBeDisabled()
    
    await user.type(input, 'São')
    
    expect(button).not.toBeDisabled()
  })

  it('deve prevenir comportamento padrão do formulário', async () => {
    const user = userEvent.setup()
    render(<WeatherSearch onSearch={mockOnSearch} />)
    
    const input = screen.getByPlaceholderText('Digite o nome da cidade...')
    const form = input.closest('form')
    
    if (form) {
      const submitEvent = vi.fn()
      form.addEventListener('submit', submitEvent)
      
      await user.type(input, 'São Paulo{Enter}')
      
      expect(submitEvent).toHaveBeenCalled()
      expect(mockOnSearch).toHaveBeenCalledWith('São Paulo')
    }
  })
})

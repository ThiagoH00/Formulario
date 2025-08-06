import React, { useState, useEffect } from 'react';

export default function FormularioDinamico() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    profissional: false,
    empresa: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = {};

    if (!form.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!form.email.includes('@')) newErrors.email = 'E-mail inválido';
    if (form.profissional && !form.empresa.trim())
      newErrors.empresa = 'Empresa é obrigatória para profissionais';

    setErrors(newErrors);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      alert('Formulário enviado com sucesso!');
      console.log(form);
    } else {
      alert('Corrija os erros antes de enviar.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>

      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
        />
        {errors.nome && <p>{errors.nome}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div className="checkbox-label">
        <input
          type="checkbox"
          name="profissional"
          checked={form.profissional}
          onChange={handleChange}
        />
        <label htmlFor="profissional">Sou profissional</label>
      </div>

      {form.profissional && (
        <div>
          <label>Empresa:</label>
          <input
            type="text"
            name="empresa"
            value={form.empresa}
            onChange={handleChange}
          />
          {errors.empresa && <p>{errors.empresa}</p>}
        </div>
      )}

      <button type="submit">Enviar</button>
    </form>
  );
}

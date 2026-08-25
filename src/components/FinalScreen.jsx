import { useState } from 'react';
import { motion } from 'framer-motion';
import { MASCOT_IMG } from '../data/config';

const DASHBOARD_URL = 'https://dashboard-seven-pearl-93.vercel.app';
const REGISTER_ENDPOINT = `${DASHBOARD_URL}/api/dashboard?type=vendedoras_register`;
const NOME_PATTERN = /^[A-ZÀ-Ý][a-zà-ÿ]+(?:\s[A-ZÀ-Ý][a-zà-ÿ]+)+$/u;

export default function FinalScreen({ minScoreReached }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    const nomeTrim = nome.trim();
    if (!NOME_PATTERN.test(nomeTrim)) {
      setErro('Use o formato Nome Sobrenome, com iniciais maiúsculas (ex: Maria Silva).');
      return;
    }
    if (senha.trim().length < 4) {
      setErro('A senha precisa ter pelo menos 4 caracteres.');
      return;
    }
    setEnviando(true);
    try {
      const res = await fetch(REGISTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeTrim, senha: senha.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || 'Não foi possível concluir o cadastro.');
        setEnviando(false);
        return;
      }
      const url = `${DASHBOARD_URL}/?onboarding=1&senha=${encodeURIComponent(senha.trim())}`;
      window.location.href = url;
    } catch (err) {
      setErro('Erro de conexão. Tente novamente.');
      setEnviando(false);
    }
  }

  return (
    <div className="board-scene theme-galaxia">
      <div className="finale-scene">
        <motion.div
          className="finale-card"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <img src={MASCOT_IMG} alt="Esquentadinho" />
          <p>
            Ufa, deu tudo certo! Agora vamos criar seu acesso ao Dashboard de Vendas —
            é só preencher os dados abaixo.
          </p>

          <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            <input
              type="text"
              placeholder="Nome Sobrenome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="finale-input"
              autoComplete="name"
            />
            <input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="finale-input"
              autoComplete="new-password"
            />
            {erro && <p style={{ color: '#ff5a5a', fontSize: 13, margin: 0 }}>{erro}</p>}
            <button type="submit" className="finale-link" disabled={enviando} style={{ border: 'none', cursor: 'pointer' }}>
              {enviando ? 'Criando acesso...' : 'Entrar no meu Dashboard →'}
            </button>
          </form>

          {minScoreReached && (
            <p style={{ marginTop: 18, fontSize: 13, color: '#ffb020' }}>
              🎁 Você atingiu a pontuação mínima na masmorra — bônus liberado!
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

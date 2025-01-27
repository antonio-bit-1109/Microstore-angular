// interfaccia che specifica quali sono i dati che il toast di prime ng deve contenere per funzionare
//questo subject gestirà i dati di visualizzazione del toast a seconda dell esito del inserimento del nuovo prodotto.

export interface IToastContent {
  severity: string;
  summary: string;
  detail: string;
  key: string;
  life: number;
}

export interface BookingDetails {
  nome: string;
  telefone: string;
  tratamento: string;
  dia: string;
  hora: string;
}

export function formatWhatsAppMessage(details: BookingDetails): string {
  const { nome, telefone, tratamento, dia, hora } = details;
  return `Olá! Gostaria de agendar uma consulta na Clínica Santa Maria dos Olivais.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Tratamento:* ${tratamento}\n*Preferência de dia:* ${dia}\n*Preferência de hora:* ${hora}\n\nFico a aguardar a confirmação. Muito obrigado(a)!`;
}

/**
 * Abre diretamente o widget de Live Chat da GoHighLevel (LeadConnector)
 * conectado na página e copia opcionalmente o resumo do agendamento para a área de transferência.
 */
export function openGoHighLevelChat(prefillMessage?: string): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  if (prefillMessage && typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(prefillMessage).catch(() => {});
  }

  const win = window as unknown as {
    leadConnector?: {
      chatWidget?: {
        openWidget?: () => void;
        isActive?: () => boolean;
      };
    };
    LC_API?: {
      open_chat_window?: () => void;
    };
  };

  // 1. API oficial global do widget LeadConnector / GoHighLevel
  if (win.leadConnector?.chatWidget?.openWidget) {
    try {
      win.leadConnector.chatWidget.openWidget();
      return true;
    } catch {
      // Continua para tentativa via DOM / Shadow DOM
    }
  }

  if (win.LC_API?.open_chat_window) {
    try {
      win.LC_API.open_chat_window();
      return true;
    } catch {
      // Continua para tentativa via DOM
    }
  }

  // 2. Inspeção do Web Component <chat-widget> e respetivo Shadow DOM
  const chatWidgetEl = document.querySelector('chat-widget') as
    | (HTMLElement & { openWidget?: () => void })
    | null;

  if (chatWidgetEl) {
    if (typeof chatWidgetEl.openWidget === 'function') {
      try {
        chatWidgetEl.openWidget();
        return true;
      } catch {
        // Continua
      }
    }

    const shadow = chatWidgetEl.shadowRoot;
    if (shadow) {
      const openPane = shadow.querySelector(
        '.lc_text-widget--box, .chat-pane-open, iframe[title*="chat" i]'
      ) as HTMLElement | null;

      const isAlreadyOpen =
        openPane &&
        window.getComputedStyle(openPane).display !== 'none' &&
        window.getComputedStyle(openPane).visibility !== 'hidden' &&
        openPane.offsetHeight > 80;

      if (!isAlreadyOpen) {
        const launcherBtn = shadow.querySelector(
          'button.lc_text-widget--btn, #lc_text-widget--btn, .lc_text-widget--bubble button, button'
        ) as HTMLElement | null;

        if (launcherBtn) {
          launcherBtn.click();
          return true;
        }
      } else {
        return true;
      }
    }
  }

  // 3. Fallback para seletores no Light DOM
  const lightLauncher = document.querySelector(
    '.lc_text-widget--btn, #lc_text-widget--btn, #lc_text-widget button'
  ) as HTMLElement | null;

  if (lightLauncher) {
    lightLauncher.click();
    return true;
  }

  return false;
}

export function clampValue(val: number, min: number, max: number): number {
  if (!Number.isFinite(val) || Number.isNaN(val)) return min;
  return Math.min(Math.max(val, min), max);
}

export function getNextReviewIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function getPrevReviewIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
}

/**
 * Inyecta el diseño, color, transparencia y bordes especulares exactos de los botones Liquid Glass en el widget de chat flotante (<chat-widget>)
 */
export function initChatWidgetLiquidGlassTheme(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const LIQUID_WIDGET_STYLE_ID = 'smo-liquid-glass-chat-widget-style';
  const cssText = `
    button,
    .lc_text-widget--bubble,
    .lc_text-widget--btn,
    #lc_text-widget--btn,
    [class*="bubble"],
    [class*="launcher"] {
      background: linear-gradient(135deg, rgba(0, 122, 255, 0.65) 0%, rgba(10, 132, 255, 0.38) 55%, rgba(94, 92, 230, 0.55) 100%) !important;
      backdrop-filter: blur(28px) saturate(190%) brightness(1.06) !important;
      -webkit-backdrop-filter: blur(28px) saturate(190%) brightness(1.06) !important;
      box-shadow:
        0 10px 28px -4px rgba(0, 122, 255, 0.45),
        0 2px 8px -1px rgba(0, 0, 0, 0.2),
        inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.85),
        inset 0 -1.5px 2px 0 rgba(0, 60, 160, 0.4),
        inset 0 0 16px 0 rgba(255, 255, 255, 0.25) !important;
      border: 1.2px solid rgba(255, 255, 255, 0.65) !important;
      transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), filter 0.3s ease !important;
    }
    button:hover,
    .lc_text-widget--bubble:hover,
    .lc_text-widget--btn:hover {
      transform: translateY(-2px) scale(1.03) !important;
      filter: brightness(1.1) !important;
    }
  `;

  const applyStyle = () => {
    const chatWidget = document.querySelector('chat-widget') as (HTMLElement & { shadowRoot: ShadowRoot | null }) | null;
    if (chatWidget?.shadowRoot && !chatWidget.shadowRoot.getElementById(LIQUID_WIDGET_STYLE_ID)) {
      const styleEl = document.createElement('style');
      styleEl.id = LIQUID_WIDGET_STYLE_ID;
      styleEl.textContent = cssText;
      chatWidget.shadowRoot.appendChild(styleEl);
    }

    const lightLauncher = document.querySelector(
      '.lc_text-widget--bubble, .lc_text-widget--btn, #lc_text-widget--btn, #lc_text-widget button'
    ) as HTMLElement | null;
    if (lightLauncher && !lightLauncher.dataset.liquidStyled) {
      lightLauncher.dataset.liquidStyled = 'true';
      lightLauncher.style.setProperty(
        'background',
        'linear-gradient(135deg, rgba(0, 122, 255, 0.65) 0%, rgba(10, 132, 255, 0.38) 55%, rgba(94, 92, 230, 0.55) 100%)',
        'important'
      );
      lightLauncher.style.setProperty('backdrop-filter', 'blur(28px) saturate(190%) brightness(1.06)', 'important');
      lightLauncher.style.setProperty('-webkit-backdrop-filter', 'blur(28px) saturate(190%) brightness(1.06)', 'important');
      lightLauncher.style.setProperty(
        'box-shadow',
        '0 10px 28px -4px rgba(0, 122, 255, 0.45), 0 2px 8px -1px rgba(0, 0, 0, 0.2), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.85), inset 0 -1.5px 2px 0 rgba(0, 60, 160, 0.4), inset 0 0 16px 0 rgba(255, 255, 255, 0.25)',
        'important'
      );
      lightLauncher.style.setProperty('border', '1.2px solid rgba(255, 255, 255, 0.65)', 'important');
    }
  };

  applyStyle();
  const observer = new MutationObserver(() => applyStyle());
  observer.observe(document.body, { childList: true, subtree: true });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initChatWidgetLiquidGlassTheme(), { once: true });
  } else {
    initChatWidgetLiquidGlassTheme();
  }
}

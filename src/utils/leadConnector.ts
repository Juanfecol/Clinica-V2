/**
 * Utility to interact directly with the embedded LeadConnector Chat/Booking Widget
 * (widgets.leadconnectorhq.com / data-widget-id="6aecef46ce7c96a75adc3f9a")
 */

declare global {
  interface Window {
    leadConnector?: {
      chatWidget?: {
        openWidget: () => void;
        closeWidget: () => void;
        isActive: () => boolean;
      };
    };
  }
}

export const CLINIC_WHATSAPP_NUMBER = '351912907024';
export const CLINIC_WHATSAPP_URL = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}`;

/**
 * Opens the embedded LeadConnector chat widget and optionally pre-fills the message text
 */
export function openLeadConnectorWidget(treatmentName?: string) {
  const initialMsg = treatmentName
    ? `Olá! Quero marcar consulta para ${treatmentName}.`
    : 'Olá! Quero marcar consulta.';

  // 1. Try official LeadConnector JavaScript API
  try {
    if (window.leadConnector?.chatWidget?.openWidget) {
      window.leadConnector.chatWidget.openWidget();
      trySetWidgetInput(initialMsg);
      return;
    }
  } catch (err) {
    console.debug('LeadConnector openWidget error:', err);
  }

  // 2. Search for the custom element <chat-widget> or its shadow DOM button
  try {
    const chatWidget = document.querySelector('chat-widget');
    if (chatWidget) {
      const shadowBtn =
        chatWidget.shadowRoot?.querySelector('button') ||
        chatWidget.shadowRoot?.querySelector('.chat-widget-button') ||
        chatWidget.shadowRoot?.querySelector('#chat-widget-button') ||
        chatWidget.shadowRoot?.querySelector('[aria-label*="chat" i]');

      if (shadowBtn) {
        (shadowBtn as HTMLElement).click();
        trySetWidgetInput(initialMsg);
        return;
      }

      (chatWidget as HTMLElement).click();
      trySetWidgetInput(initialMsg);
      return;
    }
  } catch (err) {
    console.debug('Chat-widget element click error:', err);
  }

  // 3. Fallback search on DOM for widget container or button
  try {
    const launcher =
      document.querySelector('#chat-widget-button') ||
      document.querySelector('.chat-widget-button') ||
      document.querySelector('#chat-widget-container button') ||
      document.querySelector('[data-widget-id="6aecef46ce7c96a75adc3f9a"]') ||
      document.querySelector('button[aria-label*="chat" i]');

    if (launcher) {
      (launcher as HTMLElement).click();
      trySetWidgetInput(initialMsg);
      return;
    }
  } catch (err) {
    console.debug('Launcher click error:', err);
  }

  // 4. If widget hasn't finished loading yet, retry after a short delay
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (window.leadConnector?.chatWidget?.openWidget) {
      window.leadConnector.chatWidget.openWidget();
      trySetWidgetInput(initialMsg);
      clearInterval(interval);
    } else if (attempts >= 10) {
      clearInterval(interval);
      // Fallback: smooth scroll to booking form
      const marcacao = document.getElementById('marcacao');
      if (marcacao) {
        marcacao.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, 250);
}

/**
 * Attempts to locate the input or textarea inside LeadConnector widget to pre-fill the message
 */
function trySetWidgetInput(messageText: string) {
  setTimeout(() => {
    try {
      const chatWidget = document.querySelector('chat-widget');
      let targetInput: HTMLInputElement | HTMLTextAreaElement | null = null;

      if (chatWidget?.shadowRoot) {
        targetInput = chatWidget.shadowRoot.querySelector(
          'textarea, input[type="text"], [contenteditable="true"]'
        ) as HTMLInputElement | HTMLTextAreaElement | null;
      }

      if (!targetInput) {
        targetInput = document.querySelector(
          '#chat-widget-container textarea, .chat-widget textarea, input[name="message"]'
        ) as HTMLInputElement | HTMLTextAreaElement | null;
      }

      if (targetInput) {
        if ('value' in targetInput) {
          if (!targetInput.value) {
            targetInput.value = messageText;
            targetInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      }
    } catch {
      // Ignored if cross-origin or unavailable
    }
  }, 400);
}

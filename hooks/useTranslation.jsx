import { useState } from 'react';

function useTranslation() {
  const [error, setError] = useState('');

  async function translateText(text) {
    try {
      const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: "en",
          target: "es",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      return data.translatedText;
    } catch (err) {
      setError('Error translating text at this time. Please try again later.');
      return null;
    }
  }

  return { translateText, error };
}

export default useTranslation;

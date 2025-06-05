import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PUBLIC_API_KEY = import.meta.env.PUBLIC_API_KEY;

const languages = [
    {long: "English", short: "en"}, {long: "Spanish", short: 'es'}, {long: "Afrikaans", short: "af"}, {long: "Albanian", short: "sq"},
    {long: "Amharic", short: "am"}, {long: "Arabic", short: "ar"}, {long: "Armenian", short: "hy"}, {long: "Assamese", short: "as"},
    {long: "Azerbaijani (Latin)", short: "az"}, {long: "Bangla", short: "bn"}, {long: "Bashkir", short: "ba"}, {long: "Basque", short: "eu"},
    {long: "Bhojpuri", short: "bho"}, {long: "Bodo", short: "brx"}, {long: "Bosnian (Latin)", short: "bs"}, {long: "Bulgarian", short: "bg"},
    {long: "Cantonese (Traditional)", short: "yue"}, {long: "Catalan", short: "ca"}, {long: "Chinese (Literary)", short: "lzh"},
    {long: "Chinese Simplified", short: "zh-Hans"}, {long: "Chinese Traditional", short: "zh-Hant"}, {long: "chiShona", short: "sn"},
    {long: "Croatian", short: "hr"}, {long: "Czech", short: "cs"}, {long: "Danish", short: "da"}, {long: "Dari", short: "prs"},
    {long: "Divehi", short: "dv"}, {long: "Dogri", short: "doi"}, {long: "Dutch", short: "nl"}, {long: "Estonian", short: "et"},
    {long: "Faroese", short: "fo"}, {long: "Fijian", short: "fj"}, {long: "Filipino", short: "fil"}, {long: "Finnish", short: "fi"},
    {long: "French", short: "fr"}, {long: "French (Canada)", short: "fr-ca"}, {long: "Galician", short: "gl"}, {long: "Georgian", short: "ka"},
    {long: "German", short: "de"}, {long: "Greek", short: "el"}, {long: "Gujarati", short: "gu"}, {long: "Haitian Creole", short: "ht"},
    {long: "Hausa", short: "ha"}, {long: "Hebrew", short: "he"}, {long: "Hindi", short: "hi"}, {long: "Hmong Daw (Latin)", short: "mww"},
    {long: "Hungarian", short: "hu"}, {long: "Icelandic", short: "is"}, {long: "Igbo", short: "ig"}, {long: "Indonesian", short: "id"},
    {long: "Inuinnaqtun", short: "ikt"}, {long: "Inuktitut", short: "iu"}, {long: "Inuktitut (Latin)", short: "iu-Latn"},
    {long: "Irish", short: "ga"}, {long: "Italian", short: "it"}, {long: "Japanese", short: "ja"}, {long: "Kannada", short: "kn"},
    {long: "Kashmiri", short: "ks"}, {long: "Kazakh", short: "kk"}, {long: "Khmer", short: "km"}, {long: "Kinyarwanda", short: "rw"},
    {long: "Klingon", short: "tlh-Latn"}, {long: "Klingon (plqaD)", short: "tlh-Piqd"}, {long: "Konkani", short: "gom"},
    {long: "Korean", short: "ko"}, {long: "Kurdish (Central)", short: "ku"}, {long: "Kurdish (Northern)", short: "kmr"},
    {long: "Kyrgyz (Cyrillic)", short: "ky"}, {long: "Lao", short: "lo"}, {long: "Latvian", short: "lv"}, {long: "Lithuanian", short: "lt"},
    {long: "Lingala", short: "ln"}, {long: "Lower Sorbian", short: "dsb"}, {long: "Luganda", short: "lug"}, {long: "Macedonian", short: "mk"},
    {long: "Maithili", short: "mai"}, {long: "Malagasy", short: "mg"}, {long: "Malay (Latin)", short: "ms"}, {long: "Malayalam", short: "ml"},
    {long: "Maltese", short: "mt"}, {long: "Maori", short: "mi"}, {long: "Marathi", short: "mr"}, {long: "Mongolian (Cyrillic)", short: "mn-Cyrl"}, {long: "Mongolian (Traditional)", short: "mn-Mong"}, {long: "Myanmar", short: "my"}, {long: "Nepali", short: "ne"},
    {long: "Norwegian", short: "nb"}, {long: "Nyanja", short: "	nya"}, {long: "Odia", short: "or"}, {long: "Pashto", short: "ps"},
    {long: "Persian", short: "fa"}, {long: "Polish", short: "pl"}, {long: "Portuguese (Brazil)", short: "pt"},
    {long: "Portuguese (Portugal)", short: "pt-pt"}, {long: "Punjabi", short: "pa"}, {long: "Queretaro Otomi", short: "otq"},
    {long: "Romanian", short: "ro"}, {long: "Rundi", short: "run"}, {long: "Russian", short: "ru"}, {long: "Samoan (Latin)", short: "sm"},
    {long: "Serbian (Cyrillic)", short: "sr-Cyrl"}, {long: "Serbian (Latin)", short: "sr-Latn"}, {long: "Sesotho", short: "st"},
    {long: "Sesotho sa Leboa", short: "nso"}, {long: "Setswana", short: "tn"}, {long: "Sindhi", short: "sd"}, {long: "Sinhala", short: "si"},
    {long: "Slovak", short: "sk"}, {long: "Slovenian", short: "sl"}, {long: "Somali (Arabic)", short: "so"}, {long: "Swahili (Latin)", short: "sw"}, {long: "Swedish", short: "sv"}, {long: "Tahitian", short: "ty"}, {long: "Tamil", short: "ta"}, {long: "Tatar (Latin)", short: "tt"},
    {long: "Telugu", short: "te"}, {long: "Thai", short: "th"}, {long: "Tibetan", short: "bo"},{ long: "Tigrinya", short: "ti"},
    {long: "Tongan", short: "to"}, {long: "Turkish", short: "tr"}, {long: "Turkmen (Latin)", short: "tk"}, {long: "Ukrainian", short: "uk"},
    {long: "Upper Sorbian", short: "hsb"}, {long: "Urdu", short: "ur"}, {long: "Uyghur (Arabic)", short: "ug"},
    {long: "Uzbek (Latin)", short: "uz"}, {long: "Vietnamese", short: "vi"}, {long: "Welsh", short: "cy"}, {long: "Xhosa", short: "xh"},
    {long: "Yoruba", short: "yo"}, {long: "Yucatec Maya", short: "yua"}, {long: "Zulu", short: "zu"}
]

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isLoading, setIsLoading] = useState(false);

  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    // Clear any previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Don't make an API call if input is empty
    if (inputText.trim() === '') {
      setTranslatedText('');
      setIsLoading(false); // Ensure loading is off
      return;
    }

    setIsLoading(true); // Set loading true when a new request is about to start

    // Set a new timeout
    debounceTimeoutRef.current = setTimeout(async () => {
      const options = {
        method: 'POST',
        url: 'https://google-api31.p.rapidapi.com/gtranslate',
        headers: {
          'x-rapidapi-key': PUBLIC_API_KEY,
          'x-rapidapi-host': 'google-api31.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        data: {
            text: inputText,
            to: targetLang,
            from_lang: sourceLang,
          },
      };

      try {
        const { data } = await axios.request(options);
        setTranslatedText(data.translated_text);
      } catch (error) {
        if (error.response) {
            setTranslatedText(`Error: ${error.response.status} - ${error.response.data?.message || 'Check API key/quota.'}`);
        } else if (error.request) {
            setTranslatedText('Error: No response from translation server. Check network or CORS.');
        } else {
            setTranslatedText('Error: Problem setting up translation request.');
        }
      } finally {
        setIsLoading(false); // Always set loading to false after request completes or fails
      }
    }, 500); // Debounce delay: 500ms

    // Cleanup function: This runs if the component unmounts OR if the
    // dependencies (inputText, sourceLang, targetLang) change BEFORE the timeout fires.
    // It prevents the API call from happening if the user types again quickly.
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [inputText, sourceLang, targetLang]);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  return (
    <div className="translator-container">
      <h1>Simple Translator</h1>
      <div className="language-select-row">
        <div className="language-select-group">
          <label htmlFor="source-lang">From:</label>
          <select
            id="source-lang"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.short} value={lang.short}>
                {lang.long}
              </option>
            ))}
          </select>
        </div>
        <button className="swap-button" onClick={handleSwapLanguages}>
          &#x21C6; {/* Unishort for Left Right Arrow */}
        </button>
        <div className="language-select-group">
          <label htmlFor="target-lang">To:</label>
          <select
            id="target-lang"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.short} value={lang.short}>
                {lang.long}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-area-group">
        <textarea
          className="input-textarea"
          placeholder="Enter text to translate..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <textarea
          className="output-textarea"
          placeholder="Translation will appear here..."
          value={isLoading ? "Translating..." : translatedText}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default Translator;
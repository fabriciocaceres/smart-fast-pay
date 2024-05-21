import { FlagIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hello() {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-3xl font-bold underline'>{t('general.greetings')}</h1>

      <div className='flex w-full place-content-center place-items-center gap-2 py-5'>
        <LanguageButton label='EN' value='en' />
        <LanguageButton label='PT-BR' value='pt-BR' />
      </div>
    </div>
  );
}

function LanguageButton({ label, value }: { label: string; value: string }) {
  const { i18n } = useTranslation();

  return (
    <button
      className='flex items-center gap-2 rounded-md bg-blue-200 p-2 transition-all duration-300 ease-in-out hover:bg-blue-300'
      onClick={() => i18n.changeLanguage(value)}
    >
      <FlagIcon className='h-5 w-5' />
      {label}
    </button>
  );
}

import { SettingsContext } from '@/lib/context/settings';

import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

function GetContributor() {
  const [contributors, setContributors] = useState([]);

  const { theme } = useContext(SettingsContext);

  const getData = async () => {
    const res = await fetch(
      `https://api.github.com/repos/UniKonf/vibey/contributors?per_page=100`
    );

    const data = await res.json();
    const contributorsData = data.filter(
      (contributor: any) => !contributor.login.includes('dependabot[bot]')
    );
    setContributors(contributorsData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-32">
      <p
        className={
          theme === 'dark'
            ? 'text-white text-4xl uppercase text-center font-semibold'
            : 'text-black text-4xl uppercase text-center font-semibold'
        }
      >
        Our Contributors
      </p>
      <div
        className="w-[100%] flex flex-wrap justify-evenly pt-10"
        style={{ rowGap: '2.5rem' }}
      >
        {contributors?.map((contributor: any, i) => (
          <div
            className={
              theme !== 'dark'
                ? 'w-[80%] md:w-[26%] border-2 border-transparent py-4 px-5 rounded-xl flex items-center flex-col dark:border-white space-y-3 hover:-translate-y-4 transition-all duration-[0.3s] ease-[ease] shadow-[0_10px_20px_rgba(51,65,85,1)]'
                : 'w-[80%] md:w-[26%] border-2 border-transparent py-4 px-5 rounded-xl flex items-center flex-col dark:border-white space-y-3 hover:-translate-y-4 transition-all duration-[0.3s] ease-[ease] shadow-[0_10px_20px_rgba(51,65,85,1)]'
            }
            key={i}
          >
            <Image
              className="rounded-full  hover:scale-105 w-[190px] h-[190px] object-cover transition-all duration-[0.3s] ease-[ease] mb-[18px]  hover:border-[10px] hover:border-solid hover:border-[#FF5E83] "
              src={contributor.avatar_url}
              alt={contributor.login}
              width={190}
              height={190}
            />
            <p className="text-xl">{contributor.login}</p>
            <p>{contributor.contributions} Commits</p>
            <a href={contributor.html_url} target="_blank" rel="noreferrer">
              <button className="px-20 py-2 rounded-lg bg-[#FF5E83]">
                Profile
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetContributor;
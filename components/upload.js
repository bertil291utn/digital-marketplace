const placeholder = '/assets/placeholder.svg';

const Upload = ({
  label,
  id,
  src,
  primaryText,
  secondaryText,
  optionalTest,
  onChange,
}) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>
        {label || 'Cover photo'}
      </label>
      <div
        className={`${
          !src ? 'px-6 pt-5 pb-6' : ''
        } mt-1 flex justify-center border-2 border-gray-300 border-dashed rounded-md`}
      >
        {src ? (
          <>
            {src.includes('blob') ? (
              <img src={src || placeholder} alt={`${id}`} width={200} height={200}/>
            ) : (
              src
            )}
          </>
        ) : (
          <div className='space-y-1 text-center'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 48 48'
              aria-hidden='true'
            >
              <path
                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div className='flex text-sm text-gray-600'>
              <label
                htmlFor={id}
                className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
              >
                <span>{primaryText || 'Upload cover photo'}</span>
                <input
                  id={id}
                  name={id}
                  type='file'
                  className='sr-only'
                  onChange={onChange}
                />
              </label>
              {secondaryText && <p className='pl-1'>{secondaryText}</p>}
            </div>
            {optionalTest && (
              <p className='text-xs text-gray-500'>{optionalTest}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;

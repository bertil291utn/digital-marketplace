/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default function CreateItem() {
  const [fileCoverUrl, setFileCoverUrl] = useState();
  const [areaBenefits, setAreaBenefits] = useState('🎫 VIP tickets');
  const [benefitsArray, setBenefitsArray] = useState([areaBenefits]);

  function onChangeCover(e) {
    const preview = URL?.createObjectURL(e.target.files[0]);
    setFileCoverUrl(preview);
  }

  function handleChange(event) {
    setAreaBenefits(event.target.value)
    setBenefitsArray(event.target.value.split('\n').filter((e) => e));
  }
  return (
    <div className='w-3/4 mx-auto my-10'>
      <div className='pb-12'>
        <div className='grid grid-cols-2 gap-5'>
          <div>
            <FloatingLabel
              controlId='floatingInput'
              label='Asset name'
              className='mb-3'
            >
              <Form.Control type='text' />
            </FloatingLabel>
            <FloatingLabel controlId='floatingTextDescription' label='Description'>
              <Form.Control
                as='textarea'
                style={{ height: '100px' }}
                onChange={(event) => console.log()}
              />
            </FloatingLabel>
          </div>
          <div>
            <div>
              <span className=''>NFT Cover</span>
              <Form.Group controlId='nftCover' className='mb-3'>
                <Form.Label>
                  {fileCoverUrl && (
                    <img
                      src={fileCoverUrl}
                      className='cursor-pointer'
                      title='Edit NFT cover'
                      alt={`file-cover`}
                      width={200}
                      height={200}
                    />
                  )}
                </Form.Label>
                <Form.Control
                  type='file'
                  size='sm'
                  onChange={onChangeCover}
                  hidden={fileCoverUrl}
                />
                <div>
                  <Form.Text className='text-muted'>
                    PNG, JPG, GIF up to 10MB
                  </Form.Text>
                </div>
              </Form.Group>
            </div>
            {/* 2 */}
            <div>
              <FloatingLabel
                controlId='floatingURL'
                label='Streaming single/album URL'
                className='mb-3'
              >
                <Form.Control type='text' />
              </FloatingLabel>
            </div>
          </div>
        </div>

        {/* token detailed info */}
        <div>
          <p className='my-5'>
            La distribuci&oacute;n de NFTs se va a dar en 3 layers
          </p>
          <div className='grid grid-cols-2 gap-5'>
            <FloatingLabel
              controlId='tokenNumber'
              label='Numero total de tokens'
              className='mb-3'
            >
              <Form.Control type='number' />
            </FloatingLabel>

            <FloatingLabel
              controlId='tokenNumber'
              label='Porcentaje total en regalias ex. 20%, 15%'
              className='mb-3'
            >
              <Form.Control type='number' />
            </FloatingLabel>
          </div>
          <div className='my-4'>
            <FloatingLabel controlId='allPerks' label='Describe all benefits'>
              <Form.Control
                as='textarea'
                style={{ height: '150px' }}
                onChange={handleChange}
                value={areaBenefits}
              />
            </FloatingLabel>
          </div>

          <div className='my-4'>
            <ul>
              <li className='my-3'>
                PUBLICO GENERAL
                <div className='my-4 pl-3'>
                  <div className='my-4 grid grid-cols-2 gap-5'>
                    <FloatingLabel
                      controlId='tokenLayer1'
                      label='Numero de tokens'
                      className='mb-3 col-s'
                    >
                      <Form.Control type='number' />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId='tokenLayer1'
                      label='Precio en USD por token ex. $99'
                      className='mb-3'
                    >
                      <Form.Control type='number' />
                    </FloatingLabel>
                  </div>
                  {benefitsArray.map((b, index) => (
                    <div key={index} className='flex gap-3 align-items-center'>
                      <input
                        className='h-4 w-4 cursor-pointer'
                        type='checkbox'
                        name={b.replaceAll(' ', '-')}
                        id={`${b.replaceAll(' ', '-')}-${index + 1}`}
                        onChange={(event) =>
                          console.log('event checker', event.target.checked)
                        }
                      />
                      <label
                        className='cursor-pointer capitalize-first-letter'
                        htmlFor={`${b.replaceAll(' ', '-')}-${index + 1}`}
                      >
                        {b}
                      </label>
                    </div>
                  ))}
                  <p className='my-4'>Porcentaje de ownership en este layer </p>
                </div>
              </li>
              <li className='my-3'>
                COLECCIONISTA <p>Porcentaje en layer </p>
              </li>
              <li className='my-3'>
                FAN BASE PREMIUM <p>Porcentaje en layer </p>
              </li>
            </ul>
            <p>Porcentaje total </p>
          </div>
        </div>
      </div>
    </div>
  );
}

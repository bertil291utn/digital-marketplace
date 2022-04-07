/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Benefits from '../components/create-item/Benefits.component';

export default function CreateItem() {
  const [fileCoverUrl, setFileCoverUrl] = useState();
  const [areaBenefits, setAreaBenefits] = useState('🎫 VIP tickets');
  const [benefitsArray, setBenefitsArray] = useState([areaBenefits]);

  function onChangeCover(e) {
    const preview = URL?.createObjectURL(e.target.files[0]);
    setFileCoverUrl(preview);
  }

  function handleChange(event) {
    setAreaBenefits(event.target.value);
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
            <FloatingLabel
              controlId='floatingTextDescription'
              label='Description'
            >
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
              label='Porcentaje a ceder para regalias ex. 20%'
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
              <li className='my-5'>
                <Benefits
                  title='publico general'
                  benefitsArray={benefitsArray}
                />
              </li>
              <li className='my-5'>
                <Benefits title='coleccionista' benefitsArray={benefitsArray} />
              </li>
              <li className='my-5'>
                <Benefits
                  title='fan base premium'
                  benefitsArray={benefitsArray}
                />
              </li>
            </ul>
            <p>Porcentaje total </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default function CreateItem() {
  const [fileCoverUrl, setFileCoverUrl] = useState();
  const [fileMp3Name, setFileMp3Name] = useState();

  function onChangeCover(e) {
    const preview = URL?.createObjectURL(e.target.files[0]);
    setFileCoverUrl(preview);
  }

  function onChangeMp3(e) {
    setFileMp3Name(e.target.files[0]?.name);
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
            <FloatingLabel controlId='floatingTextarea2' label='Description'>
              <Form.Control as='textarea' style={{ height: '100px' }} />
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
              <span className=''>Media file</span>
              <Form.Group controlId='mediaFile' className='mb-3'>
                <Form.Label className='w-full'>
                  {fileMp3Name && (
                    <div
                      className='border border-gray-400 bg-gray-100 p-2 rounded-md cursor-pointer'
                      title='Edit NFT cover'
                    >
                      {fileMp3Name}
                    </div>
                  )}
                </Form.Label>
                <Form.Control
                  type='file'
                  size='sm'
                  onChange={onChangeMp3}
                  hidden={fileMp3Name}
                />
                <div>
                  <Form.Text className='text-muted'>
                    MP3, WAV up to 10MB
                  </Form.Text>
                </div>
              </Form.Group>
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
              label='Porcentaje total en regalias (ex. 20%, 15%)'
              className='mb-3'
            >
              <Form.Control type='number' />
            </FloatingLabel>
          </div>
        </div>
      </div>
    </div>
  );
}

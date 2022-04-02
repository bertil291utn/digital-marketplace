/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

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
        <div className='flex gap-5'>
          <div className='w-1/2 flex flex-col'>
            <>
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
            </>
          </div>
          <div className='w-1/2'>
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
      </div>
    </div>
  );
}

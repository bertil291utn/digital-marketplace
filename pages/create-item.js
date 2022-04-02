import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function CreateItem() {
  return (
    <div className='w-3/4 mx-auto my-10'>
      <div className='pb-12'>
        <div className='flex gap-8'>
          <div className='w-full flex flex-col'>
            <>
              <FloatingLabel
                controlId='floatingInput'
                label='Asset name'
                className='mb-3'
              >
                <Form.Control type='text' />
              </FloatingLabel>
              <FloatingLabel controlId='floatingTextarea2' label='Description'>
                <Form.Control
                  as='textarea'
                  style={{ height: '100px' }}
                />
              </FloatingLabel>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

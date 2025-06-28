import { Button } from '@/_components/common/ui/button';

interface RequestPasscodeButtonProps {
  passcodeSent: boolean;
  isSubmitting: boolean;
  form: React.ElementType;
}

export function RequestPasscodeButton({
  passcodeSent,
  isSubmitting,
  form: FormComponent,
}: RequestPasscodeButtonProps) {
  return (
    <FormComponent method='post'>
      <Button
        type='submit'
        name='_action'
        value='send-passcode'
        className='w-full'
        disabled={isSubmitting || passcodeSent}
      >
        {
          isSubmitting ? '전송 중...' : passcodeSent ? '패스코드 전송 완료' : '패스코드 요청'
        }
      </Button>
    </FormComponent>
  );
}

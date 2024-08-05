# 프로필 업데이트 페이지 로직

### 프로필 이미지

- O : 이미지 수정
- X : DB 저장

### 닉네임

- O : 입력 10자 제한
- O : 5자 미만시 에러메시지
- O : 영문 대소문자, `_` 숫자 외 다른 문자 입력 시 에러메시지
- X : 중복확인 로직 작성
- O : 조건 충족 후 중복확인 버튼 활성화
- O : 중복확인 후 수정 시 확인 상태 초기화

### 수정완료

- O : 중복확인한 닉네임에 한해서만 수정 가능
- X : 이미지 저장 요청 및 프로필 수정 요청
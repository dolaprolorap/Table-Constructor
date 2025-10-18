<template>
  <CContainer
    fluid
    class="min-vh-100 d-flex justify-content-center align-items-center"
  >
    <CSpinner
      color="secondary"
    />
  </CContainer>
</template>

<style lang="scss" scoped>
.spinner-border{
  --cui-spinner-width: 100px;
  --cui-spinner-height: 100px;
  --cui-spinner-border-width: 15px;
  --cui-spinner-animation-speed: 1.5s;
}
</style>

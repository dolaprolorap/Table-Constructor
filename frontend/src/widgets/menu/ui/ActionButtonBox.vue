<template>
    <PageContainer>
        <div class="actions">
            <CButton color="primary">Создать таблицу</CButton>
            <CButton color="secondary" class="import-btn">
                <CIcon :icon="iconsSet.fileIcon" class="me-2" />
                <span>Импорт таблицы</span>
            </CButton>
        </div>
    </PageContainer>
</template>

<script setup lang="ts">
import { CButton } from '@coreui/vue'
import { PageContainer } from '@/shared/ui/components';
import { iconsSet } from '@/shared/ui/assets/icons';
</script>

<style scoped>
.actions {
    display: flex;
    gap: 12px;
    align-items: center;
}

.import-btn {
    display: flex;
    align-items: center;
    gap: 6px;
}
</style>

<template>
    <div class="h-full">
        <div class="row" :style="topheight">
            <div class="ui top attached tabular menu">
                <div class="active item">APIs</div>
            </div>
            <div class="ui bottom">
                <div class="ui relaxed middle aligned selection list">
                    <div class="item">
                        <i class="file icon"></i>
                        <div class="content">
                            <div class="header">API v1</div>
                            <div class="description">Api version 1</div>
                        </div>
                    </div>
                    <div class="item">
                        <i class="file icon"></i>
                        <div class="content">
                            <div class="header">API v2</div>
                            <div class="description">API ver 2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h4 class="ui horizontal divider header">
            <i class="tag icon"></i>
            Someapi
        </h4>
        <div class="row" :style="bottomheight">
        <div class="ui bottom">
            <div class="ui large middle aligned selection list">
                <div class="item">
                    <i class="file icon"></i>
                    <div class="content">
                        <div class="header">Overview</div>
                    </div>
                </div>
            </div>
            <div class="ui large middle aligned list">
                <div class="item">
                    <div class="content">
                        <div class="ui accordion">
                            <div class="title active">
                                &nbsp;
                                <i class="folder open icon"></i>
                                Paths
                            </div>
                            <div class="content active">
                                <div class="ui selection list">
                                        <div class="item">
                                            <i class="file icon"></i>
                                            <div class="content">
                                                <div class="content">/users</div>
                                                <div class="description">
                                                    <a class="ui tiny green label">GET</a>
                                                    <a class="ui tiny yellow label">POST</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <i class="file icon"></i>
                                            <div class="content">
                                                <div class="content">/users/{userId}</div>
                                                <div class="description">
                                                    <a class="ui tiny green label">GET</a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        defaultheightSecondRow() {
            return 50
        },
        topheight() {
            return `height: calc(${this.totalheight - this.defaultheightSecondRow}% - 2px);`
        },
        bottomheight() {
            return `height: calc(${this.defaultheightSecondRow}% - 2px);`
        }
    },
    data() {
        return {
            totalheight: 100,
        }
    }
}
</script>